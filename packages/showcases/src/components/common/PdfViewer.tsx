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
            } h-6 w-6 bg-white bg-opacity-80 shadow-md p-1 rounded-full transition-all duration-200 cursor-pointer`}
            onClick={canAct ? action : undefined}
        >
            {next ? <ArrowRightIcon/> : <ArrowLeftIcon/>}
        </div>
    );
};


export type PdfViewerProps = {
    src: string;
}

export const PdfViewer = ({
                              src,
                          }: PdfViewerProps) => {

        const [width, setWidth] = useState(0);
        const [totalPages, setTotalPages] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);

        const container = useCallback((node) => {
            if (node) setWidth(node.getBoundingClientRect().width - 20);
        }, []);


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
            <div className="h-full w-full" ref={container}>
                <div className="overflow-y-auto w-full h-full">
                    <Document file={src} onLoadSuccess={onLoad}>
                        <Page pageNumber={currentPage} width={width}/>
                    </Document>
                </div>

                <div className="absolute h-8 left-0 right-0 bottom-0 grid grid-cols-2 gap-2 select-none">
                    <PageButton action={prevPage} canAct={hasPrevPage}/>
                    <PageButton action={nextPage} canAct={hasNextPage} next/>
                </div>
            </div>
        )
    }
;
