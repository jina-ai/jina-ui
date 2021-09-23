import { AxiosResponse } from "axios";
import { OpenAPIV3 } from "openapi-types";
export declare const fileToBase64: (file: File) => Promise<string>;
export declare function urlToBase64(url: string): Promise<unknown>;
export declare function schemaToMock<IResponseData>(schema: OpenAPIV3.SchemaObject): AxiosResponse<IResponseData>;
