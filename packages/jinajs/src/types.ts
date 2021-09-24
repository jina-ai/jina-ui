import { AxiosResponse } from "axios";

export type Base64URI = `data:${string}`;
export type AnyObject = { [key: string]: any };
export type RawDocumentData = Base64URI | string | File;

export type SimpleQuery = {
  data: string | Base64URI;
  mimeType: string;
};

export type SimpleResult = {
  data: string | Base64URI;
  score: number;
  mimeType: string;
  tags?:AnyObject;
};

export type SimpleResults = SimpleResult[];
export type SimpleQueries = SimpleQuery[];

export type SimpleResponse = {
  queries: SimpleQueries;
  results: SimpleResults[];
};

export type BaseURL = `http://${string}` | `https://${string}`;

export type RequestSerializer<IRequestBody> = (documents: RawDocumentData[]) => Promise<IRequestBody> | IRequestBody
export type ResponseSerializer<IResponseData> = (response: AxiosResponse<IResponseData>) => SimpleResponse