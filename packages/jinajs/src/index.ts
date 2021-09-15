import * as utils from "./utils";
import * as serializer from "./serializer";
import {
  SimpleResult,
  SimpleResults,
  Base64URI,
  BaseURL,
  RawDocumentData,
  SimpleQueries,
  SimpleQuery,
  AnyObject,
  SimpleResponse
} from "./types";
import { JinaClient } from "./jinaClient";
import { fileToBase64 } from "./utils"


export default JinaClient;
export {
  utils,
  serializer,
  BaseURL,
  SimpleResult,
  SimpleResults,
  Base64URI,
  RawDocumentData,
  SimpleQuery,
  SimpleQueries,
  AnyObject,
  SimpleResponse,
  fileToBase64
};
