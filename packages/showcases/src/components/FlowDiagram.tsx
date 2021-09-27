import React, {useState} from "react";
import {useRouter} from 'next/router'
import SampleFlow from "../images/sampleflow.svg";
import PDFFlow from "../images/pdf-search-flowchart.svg"
import ECommerceFlow from "../images/e-commerce-flowchart.svg"
import DragAndDropRec from "../images/dragAndDropRec.svg"
import github from "../images/github.svg";
import Image from "next/image";
import {ChevronUpIcon} from "@heroicons/react/solid";
import Modal from 'react-modal';

const getFlowChartAsset = (showcase: string) => {
    switch (showcase) {
        case "pdf":
            return PDFFlow
        case "e-commerce":
            return ECommerceFlow
        default:
            return SampleFlow
    }
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
            className={"fixed bottom-0 w-full bg-gray-100 p-4 py-2 rounded-xl"}
            onClick={() => toggleShow()}
        >
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Image src={getFlowChartAsset(path)} alt="flow"/>

            </Modal>
            <div className="flex justify-center">
                <Image src={DragAndDropRec}/>
            </div>
            <div className="md:text-lg md:mt-2 flex-1 font-medium">Flow diagram</div>

            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    show ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="flex justify-center pb-8 bg-gray-100 rounded mt-4 overflow-y-auto"
                     onClick={() => setIsOpen(true)}>
                    <Image src={getFlowChartAsset(path)} alt="flow"/>

                </div>
            </div>
            {show && <a
                href="https://get.jina.ai"
                rel="noreferrer"
                target="_blank"
                className="md:mt-2 flex flor-row items-center cursor-pointer hover:bg-gray-200 md:p-2 rounded-md tranistion-all duration-200 float-right">
                <Image src={github} alt="github"/>
                <span className="ml-2">Jina on Github</span>
            </a>}
        </div>
    );
};
