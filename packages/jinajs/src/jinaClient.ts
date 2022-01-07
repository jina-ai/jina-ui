import axios, { AxiosInstance } from "axios";
import { serializeRequest, serializeResponse } from "./serializer";
import MockedClient from './MockedClient'
import {
  AnyObject,
  RawDocumentData,
  RequestSerializer,
  ResponseSerializer,
  SimpleQueries,
  SimpleResults,
} from "./types";
import { OpenAPIV3 } from "openapi-types";


export class JinaClient<IRequestBody = AnyObject ,IResponseData = AnyObject> {

  private baseURL: string;
  private client: AxiosInstance;
  private serializeRequest: RequestSerializer<IRequestBody>
  private serializeResponse: ResponseSerializer<IResponseData>
  private schema: OpenAPIV3.Document | undefined
  private debugMode: boolean

  constructor(baseURL: string, schema?: OpenAPIV3.Document, debugMode?: boolean, customSerializeRequest?: RequestSerializer<IRequestBody>, customSerializeResponse?: ResponseSerializer<IResponseData> ) {
    this.schema = schema
    this.debugMode = debugMode || false
    this.serializeRequest = customSerializeRequest || serializeRequest
    this.serializeResponse = customSerializeResponse || serializeResponse
    this.baseURL = baseURL;
    if(debugMode && this.schema) this.client = new MockedClient<IResponseData>(this.schema) as unknown as AxiosInstance
    else this.client = axios.create({ baseURL })

    this.init();
  }

  /**
  * Initializes JinaClient.
  * Makes a request to endpoint/status to check if service is up
  */
  async init() {
    try {
      const response = await this.client.get("status");
      if (response?.data?.jina?.jina) console.log("connected!")
    } catch (e) {
      console.log(e, this.baseURL)
      if(this.debugMode) console.log("jina client started in debug mode!")
    }
  }

  /**
   * 
   * @param documents can be for type Base64 encoded URI, strings or files
   * 
   * ```typescript
   * const { results, queries } = await jinaClient.search('searchQuery')
   * ```
   */
  async search(
    ...documents: RawDocumentData[]
  ): Promise<{ results: SimpleResults[]; queries: SimpleQueries }> {
    const requestBody = await this.serializeRequest(documents);
    console.log("request body:", requestBody);
    const response = await this.client.post("search", requestBody, {
      headers: {
        'content-type': ''
      }
    });
    console.log("response:", response);
    return this.serializeResponse(response);
  }

  async searchWithParameters(
    documents: RawDocumentData[],
    parameters: AnyObject
  ): Promise<{ results: SimpleResults[]; queries: SimpleQueries }> {
    console.log(parameters)
    const requestBody = await this.serializeRequest(documents);
    console.log("request body:", requestBody);
    const response = await this.client.post("search", requestBody, {
      headers: {
        'content-type': ''
      }
    });
    console.log("response:", response);
    return this.serializeResponse(response.data);
  }
  
}
