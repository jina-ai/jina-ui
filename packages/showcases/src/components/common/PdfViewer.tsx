import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PdfViewer = ({
  src,
  width,
  pageNumber,
  onLoad,
}: {
  src: string;
  width: number;
  pageNumber: number;
  onLoad: (pdf: any) => void;
}) => (
  <Document file={src} onLoadSuccess={onLoad}>
    <Page pageNumber={pageNumber} width={width} />
  </Document>
);
