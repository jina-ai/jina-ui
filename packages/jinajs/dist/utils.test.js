"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const createFileFromMockFile = (file) => {
    const blob = new Blob([file.body], { type: file.mimeType });
    blob["lastModifiedDate"] = new Date();
    blob["name"] = file.name;
    return blob;
};
describe(utils_1.fileToBase64, () => {
    it("should convert a file to base64", () => __awaiter(void 0, void 0, void 0, function* () {
        const file = createFileFromMockFile({
            body: "123",
            mimeType: "image/png",
            name: "test.png",
        });
        const result = yield utils_1.fileToBase64(file);
        expect(result.substring(0, 14)).toEqual("data:image/png");
    }));
});
//# sourceMappingURL=utils.test.js.map