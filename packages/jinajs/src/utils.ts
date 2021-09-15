import { OpenAPIV3 } from "openapi-types";

export const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const schemaToMock = (schema: OpenAPIV3.SchemaObject ) => {
    return schema?.properties?.asdf
}