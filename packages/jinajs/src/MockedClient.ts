import {OpenAPIV3} from "openapi-types";
import { AnyObject } from "types";
import { schemaToMock } from "./utils";
import {MockedResponse} from "./mockedResponse"

export default class MockedClient {
    private schema: OpenAPIV3.Document

    constructor(schema: OpenAPIV3.Document) {
        this.schema = schema
    }

    async post(url: string, requestBody: AnyObject) {
        console.log(requestBody)
        switch(url){
            case "search":
                const mocked = schemaToMock(this.schema.components?.schemas?.JinaData as OpenAPIV3.SchemaObject)
                console.log(mocked)
                return MockedResponse
                break
            default:
                return {}
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