import { AxiosResponse } from "axios";
import { OpenAPIV3 } from "openapi-types";
import { AnyObject } from "types";
export default class MockedClient<IResponse> {
    private schema;
    constructor(schema: OpenAPIV3.Document);
    post(url: string, requestBody: AnyObject): Promise<AxiosResponse<IResponse>>;
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
