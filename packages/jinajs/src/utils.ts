import {OpenAPIV3} from "openapi-types";

export const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const schemaToMock = (schema: OpenAPIV3.SchemaObject) => {
    let mockedResponse = {
        ...schema?.properties
    } as OpenAPIV3.SchemaObject
    Object.keys(mockedResponse).forEach((key) => {
        const keyTyped = key as keyof OpenAPIV3.SchemaObject
        if (mockedResponse) mockedResponse[keyTyped] = mockedResponse[keyTyped].default
    })
    const mockedData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => mockedResponse)
    return {data: mockedData}
}

export const schemaToResTypeObject = (schema: OpenAPIV3.Document) => {
    const properties = (schema.components?.schemas?.JinaData as OpenAPIV3.SchemaObject).properties
    let resTypeObject = {
        ...properties
    } as OpenAPIV3.SchemaObject
    Object.keys(resTypeObject).forEach((key) => {
        const keyTyped = key as keyof OpenAPIV3.SchemaObject
        switch (resTypeObject[keyTyped].type) {
            case "string":
                resTypeObject[keyTyped] = "string"
                break
            case "object":
                resTypeObject[keyTyped] = {}
                break
            case "number":
                resTypeObject[keyTyped] = 1
                break
            case "array":
                switch (resTypeObject[keyTyped].items.type) {
                    case "number":
                        resTypeObject[keyTyped] = [1]
                        break
                    case "string":
                        resTypeObject[keyTyped] = ["string"]
                }
        }
    })
    console.log("resTypeObject", resTypeObject)
    return resTypeObject

}