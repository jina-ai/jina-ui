import axios, { AxiosInstance } from "axios";
import { serializeRequest, serializeResponse } from "./serializer";
import {
  BaseURL,
  RawDocumentData,
  RequestSerializer,
  ResponseSerializer,
  SimpleQueries,
  SimpleResults,
} from "./types";

const defaultJinaVersion = "2"

export class JinaClient {
  private baseURL: string;
  private jinaVersion: string;
  private client: AxiosInstance;
  private serializeRequest: RequestSerializer
  private serializeResponse: ResponseSerializer

  constructor(baseURL: BaseURL, customSerializeRequest?: RequestSerializer, customSerializeResponse?: ResponseSerializer ) {
    customSerializeRequest ? this.serializeRequest = customSerializeRequest : this.serializeRequest = serializeRequest
    customSerializeResponse ? this.serializeResponse = customSerializeResponse : this.serializeResponse = serializeResponse
    this.baseURL = baseURL;
    this.jinaVersion = "";
    this.client = axios.create({ baseURL });
    this.init();
  }

  async init() {
    try {
      const response = await this.client.get("status");
      this.jinaVersion = defaultJinaVersion
      if (response?.data?.jina?.jina) this.jinaVersion = response.data.jina.jina;
    } catch (e) {
      throw new Error(
        `Could not reach flow at ${this.baseURL}. Check the URL and make sure CORS is enabled.`
      );
    }
  }

  async search(
    ...documents: RawDocumentData[]
  ): Promise<{ results: SimpleResults[]; queries: SimpleQueries }> {
    const requestBody = await this.serializeRequest(documents, this.jinaVersion);
    console.log("request body:", requestBody);
    const response = await this.client.post("search", requestBody);
    console.log("response:", response);
    return this.serializeResponse(response.data, this.jinaVersion);
  }
}
