import React from "react";
import { MediaPreview } from "./MediaPreview";

type ExampleSize = "small" | "medium" | "large";

const DEFAULT_SIZE = "medium";

export type ExampleQueryItem = {
  src?: string;
  mimeType?: string;
  text?: string;
  caption?: string;
};

function getQueryItemHeight(size: ExampleSize) {
  switch (size) {
    case "small":
      return "h-32";
    case "large":
      return "h-56";
    default:
      return "h-48";
  }
}

function getQueryItemFontSize(size: ExampleSize) {
  switch (size) {
    case "small":
      return "text-sm";
    case "large":
      return "text-lg";
    default:
      return "text-md";
  }
}

export const ExampleQuery = ({
  query,
  onClick,
  size,
}: {
  query: ExampleQueryItem;
  onClick: (query: ExampleQueryItem) => void;
  size?: ExampleSize;
}) => {
  const { src, text, caption, mimeType } = query;

  const height = getQueryItemHeight(size || DEFAULT_SIZE);

  return (
    <div
      className={`cursor-pointer rounded p-2 shadow-md hover:shadow-lg ${height} relative flex flex-col items-center bg-white`}
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
      {src && text && <div className="my-1 text-xl text-gray-500">+</div>}
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
  size,
}: {
  query: ExampleQueryItem;
  onClick: (query: ExampleQueryItem) => void;
  size?: ExampleSize;
}) => {
  const { text } = query;
  const fontSize = getQueryItemFontSize(size || DEFAULT_SIZE);
  return (
    <div className={`text-primary-500 font-semibold mb-2 ${fontSize}`}>
      <span onClick={() => onClick(query)} className="cursor-pointer">
        {text}
      </span>
    </div>
  );
};

export const ExampleQueries = ({
  queries,
  onClick,
  textOnly,
  size,
}: {
  queries: ExampleQueryItem[];
  onClick: (query: ExampleQueryItem) => void;
  textOnly?: boolean;
  size?: ExampleSize;
}) => {
  return (
    <div className="border rounded-lg p-4 select-none bg-gray-50">
      <div className="font-bold border-b mb-4 text-xl">Example Queries</div>
      {textOnly ? (
        <div className="gap-4">
          {queries.map((query, idx) => (
            <ExampleQueryText
              query={query}
              onClick={onClick}
              key={idx}
              size={size}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {queries.map((query, idx) => (
            <ExampleQuery
              query={query}
              onClick={onClick}
              key={idx}
              size={size}
            />
          ))}
        </div>
      )}
    </div>
  );
};
