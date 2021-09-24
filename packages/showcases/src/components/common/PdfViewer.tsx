import React, {useCallback, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/outline";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PageButton = ({
                        next,
                        canAct,
                        action,
                    }: {
    next?: boolean;
    canAct: boolean;
    action: () => void;
}) => {
    return (
        <div
            className={`${next ? "" : "ml-auto"} ${
                canAct ? "" : "opacity-40"
            } h-6 w-6 bg-white bg-opacity-80 shadow-md p-1 mx-3 rounded-full transition-all duration-200 cursor-pointer`}
            onClick={canAct ? action : undefined}
        >
            {next ? <ArrowRightIcon/> : <ArrowLeftIcon/>}
        </div>
    );
};


export type PdfViewerProps = {
    src: string;
}

const PdfViewer = ({
                              src,
                          }: PdfViewerProps) => {

        const [width, setWidth] = useState(0);
        const [totalPages, setTotalPages] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);

        function onLoad({numPages}: any) {
            setTotalPages(numPages);
        }

        function nextPage() {
            setCurrentPage((prev) => prev + 1);
        }

        function prevPage() {
            setCurrentPage((prev) => prev - 1);
        }

        const hasPrevPage = currentPage > 1;
        const hasNextPage = currentPage < totalPages;


        return (
            <div className="flex flex-col items-center">
              <div className="border-4 border-gray-500 mb-3">
                  <Document file={src} onLoadSuccess={onLoad}>
                      <Page pageNumber={currentPage} width={width}/>
                  </Document>
              </div>

                <div className="flex">
                    <PageButton action={prevPage} canAct={hasPrevPage}/>
                    {currentPage} / {totalPages}
                    <PageButton action={nextPage} canAct={hasNextPage} next/>
                </div>
            </div>
        )
    }
;

export default PdfViewer