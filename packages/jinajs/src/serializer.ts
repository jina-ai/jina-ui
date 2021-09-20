import { fileToBase64 } from "./utils";
import {
  AnyObject,
  RawDocumentData,
  SimpleQueries,
  SimpleResponse,
  SimpleResult,
  SimpleResults,
} from "./types";

export async function serializeRequest<IRequest>(
  documents: RawDocumentData[],
) {
  const request: any = {
    data: [],
  };
  for (let doc of documents) {
    if (doc instanceof File) {
      const uri = await fileToBase64(doc);
      request.data.push({ uri });
    } else if (doc.startsWith("data:")) {
      request.data.push({ uri: doc });
    } else {
      request.data.push({ text: doc });
    }
  }
  return request as IRequest;
}

export function serializeResponse(
  response: AnyObject,
): SimpleResponse {

  const docs = response.data.docs;
  const results: SimpleResults[] = [];
  const queries: SimpleQueries = [];
  docs.forEach((doc: any) => {
    queries.push({
      data: doc.text || doc.uri,
      mimeType: doc.mimeType,
    });
    const { matches } = doc;
    results.push(
        matches.map(({ scores, text, uri, mimeType }: any) => {
          const score = scores.values
              ? scores.values?.value
              : scores.score?.value;
          return {
            data: text || uri,
            mimeType,
            score,
          } as SimpleResult;
        })
    );
  });
  return { queries, results };
}

