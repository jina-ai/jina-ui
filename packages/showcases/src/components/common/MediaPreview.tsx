import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import React, { useCallback, useState } from "react";
import { PdfViewer } from "./PdfViewer";

/* eslint @next/next/no-img-element: "off" */

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
      {next ? <ArrowRightIcon /> : <ArrowLeftIcon />}
    </div>
  );
};

const PdfPreview = ({ src }: { src: string }) => {
  const [width, setWidth] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const container = useCallback((node) => {
    if (node) setWidth(node.getBoundingClientRect().width - 20);
  }, []);

  function onLoad({ numPages }: any) {
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
        <PdfViewer
          src={src}
          onLoad={onLoad}
          width={width}
          pageNumber={currentPage}
        />
      </div>

      <div className="absolute h-8 left-0 right-0 bottom-0 grid grid-cols-2 gap-2 select-none">
        <PageButton action={prevPage} canAct={hasPrevPage} />
        <PageButton action={nextPage} canAct={hasNextPage} next />
      </div>
    </div>
  );
};

export const MediaPreview = ({
  mimeType,
  src,
  rounded = true,
}: {
  mimeType?: string;
  src: string;
  rounded?: boolean;
}) => {
  if (mimeType?.startsWith("image") || src.startsWith("data:image"))
    return (
      <img
        src={src}
        alt="Image"
        className={`min-h-12 min-2-12 max-h-full max-w-full mx-auto${
          rounded ? " rounded" : ""
        }`}
      />
    );

  if (mimeType?.startsWith("video") || src.startsWith("data:video"))
    return (
      <video
        src={src}
        controls
        muted
        autoPlay
        loop
        className={`min-h-12 min-w-12 max-h-full max-w-full mx-auto ${
          rounded ? " rounded" : ""
        }`}
      />
    );

  if (mimeType?.startsWith("audio") || src.startsWith("data:audio"))
    return <audio controls src={src} className="w-full m-1" />;

  if (mimeType === "application/pdf" || src.startsWith("data:application/pdf"))
    return <PdfPreview src={src} />;

  // TODO: fallback option
  return null;
};
