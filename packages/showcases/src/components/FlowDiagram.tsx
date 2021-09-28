import React, {useState} from "react";
import {useRouter} from 'next/router'
import {ChevronUpIcon} from "@heroicons/react/solid";

const SampleFlow = "/assets/sampleflow.svg";
const PDFFlow = "/assets/pdf-search-flowchart.svg"
const ECommerceFlow = "/assets/e-commerce-flowchart.svg"
const github = "/assets/github.svg";

const getFlowChartAsset = (showcase: string) => {
    if(showcase.includes("pdf"))
        return PDFFlow
    if(showcase.includes("e-commerce"))
        return ECommerceFlow;
            return SampleFlow
}



export const FlowDiagram = () => {
    const [show, setShow] = useState(true);
    const {asPath} = useRouter()

    function toggleShow() {
        setShow((prev) => !prev);
    }

    return (
        <div className={"fixed bottom-0 w-full bg-gray-100 p-4 py-2 " + (!show && "bg-opacity-0")}>
            <div className={"items-center flex fex-row " + (!show && "flex-row-reverse ")}>
                {show && <a
                    href="https://get.jina.ai"
                    rel="noreferrer"
                    target="_blank"
                    className="md:mt-2 flex flor-row items-center cursor-pointer hover:bg-gray-200 md:p-2 rounded-md tranistion-all duration-200">
                    <img src={github} alt="github"/>
                    <span className="ml-2">Jina on Github</span>
                </a>}
                {show && <div className="md:text-lg md:mt-2 flex-1 font-medium text-center">How it works</div>}
                <ChevronUpIcon
                    onClick={toggleShow}
                    className={`md:mt-2 h-10 p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 transform ${
                        show ? "rotate-180" : "rotate-0"
                    }`}
                />
            </div>
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    show ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="flex justify-center pb-8 bg-gray-100 rounded mt-4 overflow-y-auto">
                    <img src={getFlowChartAsset(asPath)} alt="flow"/>

                </div>
            </div>
        </div>
    );
};
