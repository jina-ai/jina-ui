import React from "react";

/* eslint @next/next/no-img-element: "off" */

export const MediaPreview = ({
  type,
  src,
  rounded = true,
}: {
  type: string;
  src: string;
  rounded?: boolean;
}) => {
  if (type.startsWith("image"))
    return (
      <img
        src={src}
        alt="Image"
        className={`min-h-12 min-2-12 max-h-full max-w-full mx-auto${
          rounded ? " rounded" : ""
        }`}
      />
    );

	// TODO: fallback option	
  return null;
};