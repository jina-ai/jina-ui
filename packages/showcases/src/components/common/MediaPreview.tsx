import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
const PdfViewer = dynamic(() => import('./PdfViewer'), {ssr: false})

const PdfPreview = ({ src }: { src: string }) => {
  return (
   <PdfViewer src={src}/>
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
        className={`min-h-12 min-2-12 h-80 max-h-full max-w-full mx-auto${
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
