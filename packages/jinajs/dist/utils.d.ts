import { OpenAPIV3 } from "openapi-types";
export declare const fileToBase64: (file: File) => Promise<string>;
export declare const schemaToMock: (schema: OpenAPIV3.SchemaObject) => {
    data: OpenAPIV3.SchemaObject[];
};
