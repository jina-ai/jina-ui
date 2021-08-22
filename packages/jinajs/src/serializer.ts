import { fileToBase64 } from "./utils";
import {
  AnyObject,
  RawDocumentData,
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
) {
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
  [key: string]: (rawResponse: AnyObject) => Promise<SimpleResults[]>;
} = {
  "2": async (rawResponse: AnyObject) => {
    const docs = rawResponse.data.docs;
    let results: SimpleResults[] = [];
    docs.forEach((doc: any) => {
      const { matches } = doc;
      results.push(
        matches.map(({ scores, text, uri, mime_type }: any) => {
          const score = scores.values
            ? scores.values?.value
            : scores.score?.value;
          return {
            data: text || uri,
            mimeType: mime_type,
            score,
          } as SimpleResult;
        })
      );
    });
    return results;
  },
};
