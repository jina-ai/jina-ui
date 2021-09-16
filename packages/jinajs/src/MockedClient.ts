import {OpenAPIV3} from "openapi-types";
import { AnyObject } from "types";
import { schemaToMock } from "./utils";

export default class MockedClient {
    private schema: OpenAPIV3.Document

    constructor(schema: OpenAPIV3.Document) {
        this.schema = schema
    }

    async post(url: string, requestBody: AnyObject) {
        switch(url){
            case "search":
                console.log("search",requestBody)
                return schemaToMock(this.schema.components?.schemas?.JinaData as OpenAPIV3.SchemaObject)
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