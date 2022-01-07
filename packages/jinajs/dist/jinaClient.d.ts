import { AnyObject, RawDocumentData, RequestSerializer, ResponseSerializer, SimpleQueries, SimpleResults } from "./types";
import { OpenAPIV3 } from "openapi-types";
export declare class JinaClient<IRequestBody = AnyObject, IResponseData = AnyObject> {
    private baseURL;
    private client;
    private serializeRequest;
    private serializeResponse;
    private schema;
    private debugMode;
    constructor(baseURL: string, schema?: OpenAPIV3.Document, debugMode?: boolean, customSerializeRequest?: RequestSerializer<IRequestBody>, customSerializeResponse?: ResponseSerializer<IResponseData>);
    init(): Promise<void>;
    search(...documents: RawDocumentData[]): Promise<{
        results: SimpleResults[];
        queries: SimpleQueries;
    }>;
    searchWithParameters(documents: RawDocumentData[], parameters: AnyObject): Promise<{
        results: SimpleResults[];
        queries: SimpleQueries;
    }>;
}
