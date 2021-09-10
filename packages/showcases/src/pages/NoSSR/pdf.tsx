import {SearchBar} from "../../components/SearchBar";
import {FlowDiagram} from "../../components/FlowDiagram";
import JinaClient, {
    BaseURL,
    RawDocumentData,
    SimpleResults,
    SimpleQueries,
    AnyObject,
    SimpleResponse,
    SimpleResult,
    fileToBase64
} from "@jina-ai/jinajs";
import React, {useState} from "react";
import Results from "../../components/Results";
import downloadButton from '../../images/download-button.svg'
import downloadButtonBig from '../../images/download-button-big.svg'
import CrossIcon from '../../images/cross.svg'
import Image from "next/image";
import Modal from 'react-modal';
import {PdfViewer} from "../../components/common/PdfViewer";

const PDF_API_URL = "http://34.89.253.237:80"

type CustomResult = any
type CustomResults = any


const customReqSerializer = async (documents: RawDocumentData[], version: string) => {
    const doc = documents[0]
    if (doc instanceof File) {
        const uri = await fileToBase64(doc)
        const cleanedUri = uri.substring(uri.indexOf(',')+1)
        return {
            "mime_type": "pdf",
            "data": cleanedUri
        }
    } else {
        return {
            "mime_type": "text",
            "data": doc
        }
    }
}

const customResSerializer = (response: AnyObject, version: string) => {

    const docs = response.data
    const queries: SimpleQueries = [];
    const results: CustomResults[] = [];

    docs.forEach((doc: any) => {
        queries.push({
            data: doc.pdf,
            mimeType: "application/pdf"
        })
    })

    const result = docs
    results.push(result)
    return {queries, results}
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function PDF() {

    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResults[]>([]);
    const [searching, setSearching] = useState(false);
    const [viewedPDF, setViewedPDF] = useState<string>("")
    const [viewedPDFName, setViewedPDFName] = useState<string>("")
    const [searchedDocumentName, setSearchedDocumentName] = useState<string>("")
    const jinaClient = new JinaClient(PDF_API_URL, customReqSerializer, customResSerializer)

    async function search(...documents: RawDocumentData[]) {
        setSearching(true);
        if(typeof documents[0] === "string"){
            setSearchedDocumentName(documents[0])
        }
        else{
            setSearchedDocumentName(documents[0].name)
        }
        const {results, queries} = await jinaClient.search(...documents)
        setSearching(false);
        setResults(results);
        setQueries(queries);
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const CustomResultItem = (result: CustomResult) => {
        const {thumbnail, pdf_name, pdf, page} = result.result
        const [hovered, setHovered] = useState<boolean>(false)


        return (
            <div className="customResultItem mb-3">
                <style jsx>
                    {`
                      .thumpnail-hovered:hover {
                        filter: brightness(60%);
                      }

                      .customResultItem {
                        width: 30rem;
                      }
                    `}
                </style>
                <div className="relative rounded-xl border border-primary-500 m-b-3 overflow-hidden h-96"
                     onMouseOver={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}
                >
                    <img className={"cursor-pointer " + (hovered && "thumpnail-hovered ")} src={thumbnail}
                         onClick={() => {
                             setViewedPDF(pdf)
                             setViewedPDFName(pdf_name)
                             openModal()
                         }}
                    />

                    <a
                        className={'absolute top-80 right-6 cursor-pointer ' + (!hovered && "hidden")}
                        href={pdf}
                        target="_blank"
                    >
                        <Image src={downloadButton} alt="download"/>
                    </a>
                </div>
                <div>
                </div>
                <div className="px-8 pt-4 flex justify-between">
                    <div className="font-semibold max-w-xs">{pdf_name}</div>
                    <div className="float-right text-gray-700">Page {parseInt(page) + 1}</div>
                </div>
            </div>)
    }

    return (
        <div className="max-w-screen-2xl">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="PDF"
            >
                <div className="modal flex flex-col items-center">
                    <style jsx>
                        {`
                          .modal {
                            height: 80vh;
                          }
                        `}
                    </style>
                    <div className="w-full px-6 flex justify-between">
                        <div className="cursor-pointer max-w-12" onClick={closeModal}>
                            <Image src={CrossIcon}/>
                        </div>
                        <a className="cursor-pointer"
                           href={viewedPDF}
                           target="_blank"
                        >
                            <Image src={downloadButtonBig}/>
                        </a>
                    </div>
                    <p className="font-semibold text-xl mb-3">{viewedPDFName}</p>
                    <div className="mx-96 mb-12">
                        <PdfViewer src={viewedPDF}/>
                    </div>

                </div>
            </Modal>
            <SearchBar searching={searching} search={search}/>
            <div className="border-b-2 border-t-2 py-8 mt-6">
                <p className="font-semibold">Results for: <span className="text-xl">{searchedDocumentName}</span></p>
            </div>
                <Results results={results} CustomResultItem={CustomResultItem}/>

            <FlowDiagram/>
        </div>)
}