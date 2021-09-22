"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaToMock = exports.fileToBase64 = void 0;
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});
exports.fileToBase64 = fileToBase64;
const schemaToMock = (schema) => {
    let mockedResponse = Object.assign({}, schema === null || schema === void 0 ? void 0 : schema.properties);
    Object.keys(mockedResponse).forEach((key) => {
        const keyTyped = key;
        if (mockedResponse)
            mockedResponse[keyTyped] = mockedResponse[keyTyped].default;
    });
    const mockedData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => mockedResponse);
    return { data: mockedData };
};
exports.schemaToMock = schemaToMock;
//# sourceMappingURL=utils.js.map