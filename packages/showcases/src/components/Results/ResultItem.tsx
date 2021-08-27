import { SimpleResult } from "@jina-ai/jinajs";

export const ResultItem = ({ result }: { result: SimpleResult }) => {
  return <div className="bg-gray-50 rounded p-4 mb-4">{result.data}</div>;
};