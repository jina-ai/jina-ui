import { AnyObject, RawDocumentData, SimpleResponse } from "./types";
export declare function serializeRequest<IRequest>(documents: RawDocumentData[], parameters?: AnyObject): Promise<IRequest>;
export declare function serializeResponse(response: AnyObject): SimpleResponse;
