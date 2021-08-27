import React from "react";

/* eslint @next/next/no-img-element: "off" */

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
        className={`min-h-12 min-2-12 max-h-full max-w-full mx-auto${
          rounded ? " rounded" : ""
        }`}
      />
    );

  // TODO: fallback option
  return null;
};
