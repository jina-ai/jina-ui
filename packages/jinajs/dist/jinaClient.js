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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JinaClient = void 0;
const axios_1 = __importDefault(require("axios"));
const serializer_1 = require("./serializer");
const MockedClient_1 = __importDefault(require("./MockedClient"));
class JinaClient {
    constructor(baseURL, schema, debugMode, customSerializeRequest, customSerializeResponse) {
        this.schema = schema;
        this.debugMode = debugMode || false;
        this.serializeRequest = customSerializeRequest || serializer_1.serializeRequest;
        this.serializeResponse = customSerializeResponse || serializer_1.serializeResponse;
        this.baseURL = baseURL;
        if (debugMode && this.schema)
            this.client = new MockedClient_1.default(this.schema);
        else
            this.client = axios_1.default.create({ baseURL });
        this.init();
    }
    init() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get("status");
                if ((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.jina) === null || _b === void 0 ? void 0 : _b.jina)
                    console.log("connected!");
            }
            catch (e) {
                console.log(e, this.baseURL);
                if (this.debugMode)
                    console.log("jina client started in debug mode!");
            }
        });
    }
    search(...documents) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = yield this.serializeRequest(documents);
            console.log("request body:", requestBody);
            const response = yield this.client.post("search", requestBody, {
                headers: {
                    'content-type': ''
                }
            });
            console.log("response:", response);
            return this.serializeResponse(response);
        });
    }
    searchWithParameters(documents, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(parameters);
            const requestBody = yield this.serializeRequest(documents);
            console.log("request body:", requestBody);
            const response = yield this.client.post("search", requestBody, {
                headers: {
                    'content-type': ''
                }
            });
            console.log("response:", response);
            return this.serializeResponse(response.data);
        });
    }
}
exports.JinaClient = JinaClient;
//# sourceMappingURL=jinaClient.js.map