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
import React, {useEffect, useState} from "react";
import Results from "../../components/Results";
import downloadButton from '../../images/download-button.svg'
import CrossIcon from '../../images/cross.svg'
import Image from "next/image";
import Modal from 'react-modal';
import PdfViewer from "../../components/common/PdfViewer";
import { components } from "../../types/pdf/schema"
import { RequestSerializer } from "../../../../jinajs/dist/types";
import schema from "../../types/pdf/schema.json"
import { OpenAPIV3 } from "openapi-types";
import {checkIfQuestion} from "../../utils/utils";

const PDF_API_URL = "http://34.107.117.194:80"

type CustomResult = any
type CustomResults = any
type IRequest = components["schemas"]["SearchData"]
type IResponse = components["schemas"]["MatchData"]

const customReqSerializer = async (documents: RawDocumentData[]) => {
    const doc = documents[0]
    if (doc instanceof File) {
        const uri = await fileToBase64(doc)
        const cleanedUri = uri.substring(uri.indexOf(',') + 1)
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

const customResSerializer = (response: IResponse) => {
    const docs = response.data
    const queries: SimpleQueries = [];
    const results: CustomResults[] = [];
    docs?.forEach((doc: any) => {
        queries.push({
            data: doc.pdf,
            mimeType: "application/pdf"
        })
    })

    const result = docs
    results.push(result)
    return {queries, results}
}

type ModalProps = {
    viewedPDF: string,
    viewedPDFName: string,
    setIsOpen: (value: boolean) => void,
    modalIsOpen: boolean,
    getSimiliarResults: (url: string) => Promise<SimpleResults>
    search: (name: string) => void
}

function PDFModal({viewedPDF, viewedPDFName, setIsOpen, modalIsOpen, getSimiliarResults, search}: ModalProps) {

    const [similiarResults, setSimiliarResults] = useState<any>([])

    useEffect(() => {
        getSimiliarResults(viewedPDFName).then(results => setSimiliarResults(results))
    }, []);
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


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
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

                          @media only screen and (max-width: 600px) {
                            .modal {
                              width: 90vw;
                            }
                          }
                        `}
                    </style>
                    <div className="w-full md:px-6 flex justify-between flex items-center">
                        <div className="cursor-pointer max-w-12" onClick={closeModal}>
                            <Image src={CrossIcon}/>
                        </div>
                        <a className="cursor-pointer bg-primary-500 rounded-lg flex items-center pr-4 py-1"
                           href={viewedPDF}
                           target="_blank"
                           rel="noreferrer"
                        >
                            <Image src={downloadButton}/>
                            <p className="text-white font-bold">Download</p>
                        </a>
                    </div>
                    <p className="font-semibold text-xl mb-3">{viewedPDFName}</p>
                    <div className="mx-96 mb-3">
                        <PdfViewer src={viewedPDF}/>
                    </div>
                    <div className="border-t mt-6">
                        <div className="md:mx-48">
                            <p className="ml-6 font-semibold my-6">Similiar documents</p>
                            <div className="flex flex-col md:flex-row justify-start md:justify-between">
                                {similiarResults.map((result: { thumbnail: string; pdf_name: string; pdf: string; page: number; }, idx: number) => {
                                    const {thumbnail, pdf_name, pdf, page} = result
                                    return (
                                        <div
                                            onClick={() => {
                                                search(pdf_name)
                                                closeModal()
                                            }}
                                            key={`similiar-document-${idx}`}
                                            className="cursor-pointer relative rounded-xl border border-gray-500  overflow-hidden h-96 max-w-lg  mx-3 mb-3">
                                            <img src={thumbnail} alt="similiar-document"/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default function PDF() {

    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResults[]>([]);
    const [searching, setSearching] = useState(false);
    const [viewedPDF, setViewedPDF] = useState("")
    const [viewedPDFName, setViewedPDFName] = useState("")
    const [searchedDocumentName, setSearchedDocumentName] = useState("")
    const [error, setError] = useState("")

    const jinaClient = new JinaClient<IRequest,IResponse>(PDF_API_URL, schema as OpenAPIV3.Document, true, customReqSerializer, customResSerializer)

    async function getSimiliarResults(url: string) {
        const {results} = await jinaClient.search(url)
        return results[0].slice(1, 4)
    }

    async function search(...documents: RawDocumentData[]) {
        let validQuestion = true
        if (typeof documents[0] === "string") {
            setSearchedDocumentName(documents[0])
            if (!checkIfQuestion(documents[0])) validQuestion = false
        } else {
            setSearchedDocumentName(documents[0].name)
        }
        if (validQuestion) {
            setError("")
            setSearching(true);
            const {results, queries} = await jinaClient.search(documents[0])
            setSearching(false);
            setResults(results);
            setQueries(queries);
        } else setError("Please provide a valid question")

    }

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    const CustomResultItem = (result: CustomResult) => {
        const {thumbnail, pdf_name, pdf, page} = result.result
        const [hovered, setHovered] = useState<boolean>(false)

        return (
            <div className="customResultItem m-3">
                <style jsx>
                    {`
                      .thumpnail-hovered:hover {
                        filter: brightness(60%);
                      }

                      .customResultItem {
                        width: 30rem;
                      }

                      @media only screen and (max-width: 600px) {
                        .customResultItem {
                          width: 90vw;
                        }
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
                         alt="pdf thumbnail"
                    />

                    <button>
                        <a
                            className={'absolute top-80 right-6 cursor-pointer ' + (!hovered && "hidden")}
                            href={pdf}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image src={downloadButton} alt="download"/>
                        </a>
                    </button>
                </div>
                <div>
                </div>
                <div className="px-2 md:px-8 pt-4 flex justify-between">
                    <div className="text-sm md:text-base font-semibold max-w-xs">{pdf_name}</div>
                    <div className="float-right text-gray-700 min-w-max">Page {parseInt(page) + 1}</div>
                </div>
            </div>)
    }

    return (
        <div className="">
            <h1 className="font-bold text-2xl md:text-5xl mb-3">
                Ask a paper anything!
            </h1>
            {modalIsOpen && <PDFModal
                search={search}
                viewedPDF={viewedPDF} viewedPDFName={viewedPDFName} setIsOpen={setIsOpen}
                modalIsOpen={modalIsOpen}
                getSimiliarResults={getSimiliarResults}/>}
            <SearchBar searching={searching} search={search}/>
            <div className="border-b-2 border-t-2 py-3 md:py-8  mt-6">


                <h2 className="font-bold text-xl mb-3">Examples:</h2>

                <div className="ml-3 text-primary-500 font-semibold">
                    <p
                        className="mb-3 cursor-pointer"
                        onClick={() => search("What is the meaning of life?")}
                    >What is the meaning of life?</p>
                    <p className="mb-3 cursor-pointer"
                       onClick={() => search("What is a paper?")}
                    >What is a paper?</p>
                    <p className="mb-3 cursor-pointer"
                       onClick={() => search("What does the fox say?")}
                    >What does the fox say?</p>
                </div>
                {error === "" ?
                    <p className="font-semibold">
                        Results for: <span
                        className="text-xl">{searchedDocumentName}</span>
                    </p> :
                    <p className="font-semibold text-xl text-red-500">
                        {error}
                    </p>
                }

            </div>
            <Results results={results} CustomResultItem={CustomResultItem}/>

            <FlowDiagram/>
        </div>)
}