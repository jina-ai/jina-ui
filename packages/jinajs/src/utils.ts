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
    const copy = schema.components?.schemas?.JinaData as OpenAPIV3.SchemaObject

    let resTypeObject = {
        ...copy.properties
    } as OpenAPIV3.SchemaObject
    Object.keys(resTypeObject).forEach((key) => {
        const keyTyped = key as keyof OpenAPIV3.SchemaObject

        console.log("here", resTypeObject[keyTyped].type)
        switch (resTypeObject[keyTyped].type){
            case "string":
                console.log("ASDFL:AKHSDFGLV:KANSJDFG")
                break
            case "array":
        }
    })
    return resTypeObject

}