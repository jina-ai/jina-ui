import { fileToBase64 } from "./utils";
import {
  AnyObject,
  RawDocumentData,
  SimpleQueries,
  SimpleResponse,
  SimpleResult,
  SimpleResults,
} from "./types";

const DEFAULT_VERSION = "2";

export function serializeRequest(
  documents: RawDocumentData[],
  version: string = DEFAULT_VERSION
) {
  const serialize =
    requestSerializer[version] || requestSerializer[DEFAULT_VERSION];
  return serialize(documents);
}

export function serializeResponse(
  response: AnyObject,
  version: string = DEFAULT_VERSION
): SimpleResponse {
  const serialize =
    responseSerializer[version] || responseSerializer[DEFAULT_VERSION];

  return serialize(response);
}

const requestSerializer: {
  [key: string]: (documents: RawDocumentData[]) => Promise<AnyObject>;
} = {
  "2": async (documents: RawDocumentData[]) => {
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
    return request;
  },
};

const responseSerializer: {
  [key: string]: (rawResponse: AnyObject) => SimpleResponse;
} = {
  "2": (rawResponse: AnyObject) => {
    const docs = rawResponse.data.docs;
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
  },
};
