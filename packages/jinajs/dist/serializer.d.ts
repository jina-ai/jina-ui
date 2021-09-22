import { AnyObject, RawDocumentData, SimpleResponse } from "./types";
export declare function serializeRequest<IRequest>(documents: RawDocumentData[]): Promise<IRequest>;
export declare function serializeResponse(response: AnyObject): SimpleResponse;
