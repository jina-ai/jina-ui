import { fileToBase64 } from "./utils";

interface MockFile {
  name: string
  body: string
  mimeType: string
}

const createFileFromMockFile = (file: MockFile): File => {
  const blob = new Blob([file.body], { type: file.mimeType }) as any
  blob["lastModifiedDate"] = new Date()
  blob["name"] = file.name
  return blob as File
}

describe(fileToBase64, () => {
  it("should convert a file to base64", async () => {
    const file = createFileFromMockFile({
      body: "123",
      mimeType: "image/png",
      name: "test.png",
    })
    const result = await fileToBase64(file)
    expect(result.substring(0, 14)).toEqual("data:image/png")
  })
})
