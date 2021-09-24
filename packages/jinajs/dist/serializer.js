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
exports.serializeResponse = exports.serializeRequest = void 0;
const utils_1 = require("./utils");
function serializeRequest(documents, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = {
            data: [],
        };
        for (let doc of documents) {
            if (doc instanceof File) {
                const uri = yield utils_1.fileToBase64(doc);
                request.data.push({ uri });
            }
            else if (doc.startsWith("data:")) {
                request.data.push({ uri: doc });
            }
            else {
                request.data.push({ text: doc });
            }
        }
        if (parameters)
            request.parameters = parameters;
        return request;
    });
}
exports.serializeRequest = serializeRequest;
function serializeResponse(response) {
    const docs = response.data.docs;
    const results = [];
    const queries = [];
    docs.forEach((doc) => {
        queries.push({
            data: doc.text || doc.uri,
            mimeType: doc.mimeType,
        });
        const { matches } = doc;
        results.push(matches.map(({ scores, text, uri, mimeType, tags }) => {
            var _a, _b;
            const score = scores.values
                ? (_a = scores.values) === null || _a === void 0 ? void 0 : _a.value
                : (_b = scores.score) === null || _b === void 0 ? void 0 : _b.value;
            return {
                data: text || uri,
                mimeType,
                score,
                tags
            };
        }));
    });
    return { queries, results };
}
exports.serializeResponse = serializeResponse;
//# sourceMappingURL=serializer.js.map