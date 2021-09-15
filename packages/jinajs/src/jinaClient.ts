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


export class JinaClient<IRequest,IResponse> {

  private baseURL: string;
  private client: AxiosInstance;
  private serializeRequest: RequestSerializer<IRequest>
  private serializeResponse: ResponseSerializer<IResponse>

  constructor(baseURL: BaseURL, customSerializeRequest?: RequestSerializer<IRequest>, customSerializeResponse?: ResponseSerializer<IResponse> ) {
    this.serializeRequest = customSerializeRequest || serializeRequest
    this.serializeResponse = customSerializeResponse || serializeResponse
    this.baseURL = baseURL;
    this.client = axios.create({ baseURL });
    this.init();
  }

  async init() {
    try {
      const response = await this.client.get("status");
      if (response?.data?.jina?.jina) console.log("connected!")
    } catch (e) {
      throw new Error(
        `Could not reach flow at ${this.baseURL}. Check the URL and make sure CORS is enabled.`
      );
    }
  }

  async search(
    ...documents: RawDocumentData[]
  ): Promise<{ results: SimpleResults[]; queries: SimpleQueries }> {
    const requestBody = await this.serializeRequest(documents);
    console.log("request body:", requestBody);
    const response = await this.client.post("search", requestBody);
    console.log("response:", response);
    return this.serializeResponse(response.data);
  }
}
