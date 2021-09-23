"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaToMock = exports.urlToBase64 = exports.fileToBase64 = void 0;
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});
exports.fileToBase64 = fileToBase64;
function urlToBase64(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.open("GET", `${url}`);
        xhr.onload = function () {
            let base64, binary, bytes, mediaType;
            bytes = new Uint8Array(xhr.response);
            binary = [].map
                .call(bytes, function (byte) {
                return String.fromCharCode(byte);
            })
                .join("");
            mediaType = xhr.getResponseHeader("content-type");
            base64 = [
                "data:",
                mediaType ? mediaType + ";" : "",
                "base64,",
                btoa(binary),
            ].join("");
            resolve(base64);
        };
        xhr.onerror = function (e) {
            console.log("xhr error:", e);
            reject(e);
        };
        xhr.send();
    });
}
exports.urlToBase64 = urlToBase64;
function schemaToMock(schema) {
    let mockedResponse = Object.assign({}, schema === null || schema === void 0 ? void 0 : schema.properties);
    Object.keys(mockedResponse).forEach((key) => {
        const keyTyped = key;
        if (mockedResponse)
            mockedResponse[keyTyped] = mockedResponse[keyTyped].default;
    });
    const mockedData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => mockedResponse);
    const data = { data: mockedData };
    return {
        data,
        status: 200,
        statusText: "searched successfully",
        headers: "",
        config: {}
    };
}
exports.schemaToMock = schemaToMock;
//# sourceMappingURL=utils.js.map