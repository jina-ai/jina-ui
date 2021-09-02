import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PdfViewer = ({
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

export default PdfViewer;
