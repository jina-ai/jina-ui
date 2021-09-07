import React from "react";
import { SimpleResult } from "@jina-ai/jinajs";
import { MediaPreview } from "../common/MediaPreview";
import { TextPreview } from "../common/TextPreview";

export const ResultItem = ({
  result,
  // onClick,
}: {
  result: SimpleResult;
  // onClick: () => void;
}) => {
  const { data, mimeType } = result;

  let isText =
      !(mimeType.startsWith("data:") || mimeType.startsWith("application"))
      && !data.startsWith("data:");

  return (
    <div
      // onClick={onClick}
      className="bg-gray-50 rounded p-4 cursor:pointer flex items-center"
    >
      {isText ? (
        <TextPreview text={data} />
      ) : (
        <MediaPreview src={data} mimeType={mimeType} />
      )}
    </div>
  );
};
