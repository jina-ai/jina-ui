import React, {useState} from "react";
import {useRouter} from 'next/router'
import {ChevronUpIcon} from "@heroicons/react/solid";
import Modal from 'react-modal';

const SampleFlow = "/assets/sampleflow.svg";
const PDFFlow = "/assets/pdf-search-flowchart.svg"
const ECommerceFlow = "/assets/e-commerce-flowchart.svg"
const github = "/assets/github.svg";
const IconPlusSearch ="/assets/icon-plus-search.svg"
const DragAndDropRec ="/assets/drag-and-drop-rec.svg"

const getFlowChartAsset = (showcase: string) => {
    if(showcase.includes("pdf"))
        return PDFFlow
    if(showcase.includes("e-commerce"))
        return ECommerceFlow;
            return SampleFlow
}

const customStyles = {
    overlay: {
        background: "black"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


export const FlowDiagram = () => {
    const [show, setShow] = useState(true);
    const {asPath} = useRouter()
    const path = asPath.replace('/', '')
    const [modalIsOpen, setIsOpen] = React.useState(false);


    function toggleShow() {
        setShow((prev) => !prev);
    }


    function openModal() {
        setIsOpen(true);
    }

    const [y, setY] = useState(0);

    return (
        <div
            className={"fixed bottom-0 w-full bg-gray-100 p-4 py-2 rounded-xl cursor-pointer"}
            onClick={() => toggleShow()}
        >
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <img src={getFlowChartAsset(path)} alt="flow"/>

            </Modal>
            <div className="flex justify-center mt-3">
                <img src={DragAndDropRec} alt={"dragAndDropRec"}/>
            </div>
            <div className="md:text-lg md:mt-2 flex-1 font-medium mb-3">Flow diagram</div>

            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    show ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="flex justify-center">
                    <div className="flex text-gray-600">
                        <img src={IconPlusSearch} alt="IconPlus"/>
                        <span className="ml-1">
                         Click to check full image
                    </span>
                    </div>
                </div>
                <div className="flex justify-center pb-8 bg-gray-100 rounded mt-4 overflow-y-auto"
                     onClick={() => setIsOpen(true)}>
                    <img src={getFlowChartAsset(path)} alt="flow"/>

                </div>
            </div>
            {show && <a
                href="https://get.jina.ai"
                rel="noreferrer"
                target="_blank"
                className="mb-3 md:mt-2 flex flor-row items-center cursor-pointer hover:bg-gray-200 md:p-2 rounded-md tranistion-all duration-200 float-right">
                <img src={github} alt="github"/>
                <span className="ml-2">Jina on Github</span>
            </a>}
        </div>
    );
};
