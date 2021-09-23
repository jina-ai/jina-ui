import { AnyObject, BaseURL, RawDocumentData, RequestSerializer, ResponseSerializer, SimpleQueries, SimpleResults } from "./types";
import { OpenAPIV3 } from "openapi-types";
export declare class JinaClient<IRequest = AnyObject, IResponse = AnyObject> {
    private baseURL;
    private client;
    private serializeRequest;
    private serializeResponse;
    private schema;
    private debugMode;
    constructor(baseURL: BaseURL, schema?: OpenAPIV3.Document, debugMode?: boolean, customSerializeRequest?: RequestSerializer<IRequest>, customSerializeResponse?: ResponseSerializer<IResponse>);
    init(): Promise<void>;
    search(...documents: RawDocumentData[]): Promise<{
        results: SimpleResults[];
        queries: SimpleQueries;
    }>;
}
