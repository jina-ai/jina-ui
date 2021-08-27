export type Base64URI = `data:${string}`;
export type AnyObject = { [key: string]: any };
export type RawDocumentData = Base64URI | string | File;

export type SimpleResult = {
  data: string | Base64URI;
  score: number;
  mimeType: string;
};

export type SimpleResults = SimpleResult[];

export type BaseURL = `http://${string}` | `https://${string}`;
