import { AxiosResponse } from "axios";
import {OpenAPIV3} from "openapi-types";
import { AnyObject } from "types";
import { schemaToMock } from "./utils";

export default class MockedClient<IResponse> {
    private schema: OpenAPIV3.Document

    constructor(schema: OpenAPIV3.Document) {
        this.schema = schema
    }

    async post(url: string, requestBody: AnyObject): Promise<AxiosResponse<IResponse>> {
        switch(url){
            case "search":
                console.log("search",requestBody)
                return schemaToMock<IResponse>(this.schema.components?.schemas?.JinaData as OpenAPIV3.SchemaObject)
                break
            default:
                return {
                    data: {
                        something: "went wrong"
                    } as unknown as IResponse,
                    status: 500,
                    statusText: "error",
                    headers: "",
                    config: {}

                }
        }
    }

    async get(url: string) {
        if(url === "search") {
            return {
                data: {
                    jina: {
                        jina: "2"
                    }
                }
            }
        }
        else return {}

    }
}