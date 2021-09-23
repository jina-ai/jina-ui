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
class MockedClient {
    constructor(schema) {
        this.schema = schema;
    }
    post(url, requestBody) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            switch (url) {
                case "search":
                    console.log("search", requestBody);
                    return utils_1.schemaToMock((_b = (_a = this.schema.components) === null || _a === void 0 ? void 0 : _a.schemas) === null || _b === void 0 ? void 0 : _b.JinaData);
                    break;
                default:
                    return {
                        data: {
                            something: "went wrong"
                        },
                        status: 500,
                        statusText: "error",
                        headers: "",
                        config: {}
                    };
            }
        });
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (url === "search") {
                return {
                    data: {
                        jina: {
                            jina: "2"
                        }
                    }
                };
            }
            else
                return {};
        });
    }
}
exports.default = MockedClient;
//# sourceMappingURL=MockedClient.js.map