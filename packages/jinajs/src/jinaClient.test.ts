import { JinaClient } from "jinaClient"
import { schema } from "jinaClient.testData"

describe("jina client", () => {
    describe("when initialized", () => {
        it("should not fail", () => {
            jest.spyOn(JinaClient.prototype, "init")
            const testUrl = "http://testUrl.com"
            const jinaClient = new JinaClient(testUrl, schema, true)
            expect(jinaClient.init).toBeCalledTimes(1)
        })
    })
})