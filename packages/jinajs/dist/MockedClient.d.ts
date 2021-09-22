import { OpenAPIV3 } from "openapi-types";
import { AnyObject } from "types";
export default class MockedClient {
    private schema;
    constructor(schema: OpenAPIV3.Document);
    post(url: string, requestBody: AnyObject): Promise<{}>;
    get(url: string): Promise<{
        data: {
            jina: {
                jina: string;
            };
        };
    } | {
        data?: undefined;
    }>;
}
