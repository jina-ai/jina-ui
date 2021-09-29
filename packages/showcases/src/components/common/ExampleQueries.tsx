import React from "react";
import { MediaPreview } from "./MediaPreview";

export type ExampleQueryItem = {
  src?: string;
  mimeType?: string;
  text?: string;
  caption?: string;
};

export const ExampleQuery = ({
  query,
  onClick,
}: {
  query: ExampleQueryItem;
  onClick: (query: ExampleQueryItem) => void;
}) => {
  const { src, text, caption, mimeType } = query;
  return (
    <div
      className="cursor-pointer rounded p-2 shadow-md hover:shadow-lg h-48 relative flex flex-col items-center bg-white"
      onClick={() => onClick(query)}
    >
      <div className="flex-1 overflow-hidden relative">
        {src ? (
          mimeType === "model" ? (
            <model-viewer
              src={src}
              alt="result mesh"
              ar
              ar-modes="webxr scene-viewer quick-look"
              environment-image="neutral"
              interaction-policy="allow-when-focused"
              interaction-prompt="when-focused"
              camera-controls
            />
          ) : (
            <MediaPreview src={src} mimeType={mimeType} />
          )
        ) : (
          ""
        )}
      </div>
      {src && text && <div className="my-2 text-xl text-gray-500">+</div>}
      {text && (
        <div className="bg-gray-50 p-1 px-2 inline-block rounded-md">
          {'"'}
          {text}
          {'"'}
        </div>
      )}
      {caption && <div>{caption}</div>}
    </div>
  );
};

export const ExampleQueryText = ({
  query,
  onClick,
}: {
  query: ExampleQueryItem;
  onClick: (query: ExampleQueryItem) => void;
}) => {
  const { text } = query;
  return (
    <div className="text-primary-500 font-semibold mb-2">
      <span onClick={() => onClick(query)} className="cursor-pointer">{text}</span>
    </div>
  );
};

export const ExampleQueries = ({
  queries,
  onClick,
  textOnly,
}: {
  queries: ExampleQueryItem[];
  onClick: (query: ExampleQueryItem) => void;
  textOnly?: boolean;
}) => {
  return (
    <div className="border rounded-lg p-4 select-none bg-gray-50">
      <div className="font-bold border-b mb-4 text-xl">Example Queries</div>
      {textOnly ? (
        <div className="gap-4">
          {queries.map((query, idx) => (
            <ExampleQueryText query={query} onClick={onClick} key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {queries.map((query, idx) => (
            <ExampleQuery query={query} onClick={onClick} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};
