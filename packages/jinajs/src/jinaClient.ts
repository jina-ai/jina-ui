import axios, { AxiosInstance } from "axios";
import { serializeRequest, serializeResponse } from "./serializer";
import { BaseURL, RawDocumentData, SimpleResults } from "./types";

export class JinaClient {
  private baseURL: string;
  private jinaVersion: string;
  private client: AxiosInstance;

  constructor(baseURL: BaseURL) {
    this.baseURL = baseURL;
    this.jinaVersion = "";
    this.client = axios.create({ baseURL });
    this.init();
  }

  async init() {
    try {
      const response = await this.client.get("status");
      this.jinaVersion = response.data.jina.jina;
    } catch (e) {
      throw new Error(
        `Could not reach flow at ${this.baseURL}. Check the URL and make sure CORS is enabled.`
      );
    }
  }

  /**
   * Call jina's search endpoint with requestBody
   * 
   * @param document - raw document data
   * @returns a promise that resolves into results
   */
  async search(document: RawDocumentData): Promise<SimpleResults>;
  async search(...documents: RawDocumentData[]): Promise<SimpleResults[]>;
  async search(query: any): Promise<any> {
    if (Array.isArray(query)) {
      const requestBody = await serializeRequest(query, this.jinaVersion);
      console.log("request body:", requestBody);
      const response = await this.client.post("search", requestBody);
      console.log("response:", response);
      return serializeResponse(response.data, this.jinaVersion);
    } else {
      const requestBody = await serializeRequest([query], this.jinaVersion);
      console.log("request body:", requestBody);
      const response = await this.client.post("search", requestBody);
      console.log("response:", response);
      const serialized = await serializeResponse(
        response.data,
        this.jinaVersion
      );
      return serialized[0];
    }
  }
}
