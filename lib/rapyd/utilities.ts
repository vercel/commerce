import crypto from "crypto";

const BASE_URL = process.env.RAPYD_BASE_URL;
const SECRET_KEY = process.env.RAPYD_SECRET_KEY;
const ACCESS_KEY = process.env.RAPYD_ACCESS_KEY;

if (!SECRET_KEY || !ACCESS_KEY) {
  throw new Error("RAPYD_SECRET_KEY and RAPYD_ACCESS_KEY must be set");
}

type HttpMethod = "get" | "put" | "post" | "delete";

interface SignatureHeaders {
  access_key: string;
  salt: string;
  timestamp: string;
  signature: string;
  idempotency: string;
}

interface RequestConfig {
  method: HttpMethod;
  path: string;
  body?: Record<string, unknown>;
}

const generateSalt = (length = 12): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

const getUnixTime = ({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
} = {}): number => {
  const now = new Date();
  now.setDate(now.getDate() + days);
  now.setHours(now.getHours() + hours);
  now.setMinutes(now.getMinutes() + minutes);
  now.setSeconds(now.getSeconds() + seconds);
  return Math.floor(now.getTime() / 1000);
};

const updateTimestampSaltSig = ({
  method,
  path,
  body,
}: RequestConfig): {
  salt: string;
  timestamp: number;
  signature: string;
} => {
  const normalizedPath = path.startsWith("http")
    ? path.substring(path.indexOf("/v1"))
    : path;

  const salt = generateSalt();
  const timestamp = getUnixTime();
  const bodyString = body ? JSON.stringify(body) : "";

  const toSign = [
    method,
    normalizedPath,
    salt,
    timestamp.toString(),
    ACCESS_KEY,
    SECRET_KEY,
    bodyString,
  ].join("");

  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(toSign);
  const signature = Buffer.from(hmac.digest("hex")).toString("base64url");

  return { salt, timestamp, signature };
};

const createHeaders = ({
  method,
  path,
  body,
}: RequestConfig): {
  headers: SignatureHeaders;
  body: string;
} => {
  const { salt, timestamp, signature } = updateTimestampSaltSig({
    method,
    path,
    body,
  });

  const headers: SignatureHeaders = {
    access_key: ACCESS_KEY,
    salt,
    timestamp: timestamp.toString(),
    signature,
    idempotency: `${getUnixTime()}${salt}`,
  };

  return {
    headers,
    body: body ? JSON.stringify(body) : "",
  };
};

const makeRequest = async ({
  method,
  path,
  body,
}: RequestConfig): Promise<unknown> => {
  const { headers, body: stringifiedBody } = createHeaders({
    method,
    path,
    body,
  });
  const url = `${BASE_URL}${path}`;

  const requestConfig: RequestInit = {
    method: method.toUpperCase(),
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  };

  if (method !== "get" && stringifiedBody) {
    requestConfig.body = stringifiedBody;
  }

  console.log("requestConfig", requestConfig);
  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export { makeRequest, type HttpMethod, type RequestConfig };
