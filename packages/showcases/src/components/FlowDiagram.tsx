import React, { useState } from "react";
import SampleFlow from "../images/sampleflow.svg";
import PDFFlow from "../images/pdf-search-flowchart.svg"
import ECommerceFlow from "../images/e-commerce-flowchart.svg"
import github from "../images/github.svg";
import Image from "next/image";
import { ChevronUpIcon } from "@heroicons/react/solid";

const getFlowChartAsset = (showcase: string) => {
  switch(showcase) {
    case "pdf": return PDFFlow
    case "e-commerce": return ECommerceFlow
    default: return SampleFlow
  }
}

export const FlowDiagram = () => {
  const [show, setShow] = useState(false);
  function toggleShow() {
    setShow((prev) => !prev);
  }
  return (
    <div className="fixed bottom-0 w-full bg-gray-100 p-4 py-2">
      <div className="items-center flex fex-row">
        <span className="text-lg flex-1 font-medium">Flow Diagram</span>
        <ChevronUpIcon
          onClick={toggleShow}
          className={`h-10 p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 transform ${
            show ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          show ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex justify-center p-4 bg-white rounded mt-4 overflow-y-auto">
          <Image src={getFlowChartAsset('pdf')} alt="flow" />
        <div className="justify-self-end self-end  mt-4 flex flor-row items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md tranistion-all duration-200">
          <Image src={github} alt="github" />
          <span className="ml-2">View on Github</span>
        </div>
        </div>
      </div>
    </div>
  );
};
