import React from "react";
import { SimpleResult } from "@jina-ai/jinajs";
import { MediaPreview } from "../common/MediaPreview";
import { TextPreview } from "../common/TextPreview";

type ResultItemProps = {
  result: SimpleResult
  onClick?: () => void
  classNames?: string
}

export const ResultItem = ({
  result,
  onClick,
  classNames,
}: ResultItemProps) => {
  const { data, mimeType } = result;

  let isText = mimeType.includes("text")

  return (
    <div
      onClick={onClick}
      className={`bg-gray-50 rounded p-4 cursor:pointer flex items-center ${classNames}`}
    >
      {isText ? (
        <TextPreview text={data} />
      ) : (
        <MediaPreview src={data} mimeType={mimeType} />
      )}
    </div>
  );
};
