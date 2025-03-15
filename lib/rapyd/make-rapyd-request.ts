import { createHmac, randomBytes } from "crypto";
import type { IncomingHttpHeaders } from "http";
import https from "https";

interface RapydRequestOptions {
  method: "get" | "put" | "post" | "delete";
  urlPath: string;
  body?: Record<string, unknown> | null;
}

interface RapydResponse {
  statusCode: number;
  headers: IncomingHttpHeaders;
  body: Record<string, unknown>;
}

const BASE_URL = process.env.RAPYD_BASE_URL;
const secretKey = process.env.RAPYD_SECRET_KEY ?? "";
const accessKey = process.env.RAPYD_ACCESS_KEY ?? "";

if (!BASE_URL || !secretKey || !accessKey) {
  throw new Error(
    "RAPYD_BASE_URL, RAPYD_SECRET_KEY, and RAPYD_ACCESS_KEY must be set"
  );
}

const log = false;

const makeRequest = async ({
  method,
  urlPath,
  body = null,
}: RapydRequestOptions): Promise<RapydResponse> => {
  try {
    const httpMethod = method.toLowerCase();
    const httpBaseURL = BASE_URL.replace(/^https?:\/\//, "").replace(
      /\/+$/,
      ""
    );
    const httpURLPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
    const salt = generateRandomString(8);
    const idempotency = new Date().getTime().toString();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = sign({
      method: httpMethod,
      urlPath: httpURLPath,
      salt,
      timestamp,
      body,
    });

    const options = {
      hostname: httpBaseURL,
      port: 443,
      path: httpURLPath,
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        salt,
        timestamp,
        signature,
        access_key: accessKey,
        idempotency,
      },
    };

    return await httpRequest(options, body);
  } catch (error) {
    console.error("Error generating request options:", error);
    throw error;
  }
};

interface SignOptions {
  method: string;
  urlPath: string;
  salt: string;
  timestamp: number;
  body: Record<string, unknown> | null;
}

const sign = ({
  method,
  urlPath,
  salt,
  timestamp,
  body,
}: SignOptions): string => {
  try {
    let bodyString = "";
    if (body) {
      bodyString = JSON.stringify(body);
      bodyString = bodyString === "{}" ? "" : bodyString;
    }

    const toSign =
      method.toLowerCase() +
      urlPath +
      salt +
      timestamp +
      accessKey +
      secretKey +
      bodyString;
    log && console.log(`toSign: ${toSign}`);

    const hash = createHmac("sha256", secretKey);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64");
    log && console.log(`signature: ${signature}`);

    return signature;
  } catch (error) {
    console.error("Error generating signature:", error);
    throw error;
  }
};

const generateRandomString = (size: number): string => {
  try {
    return randomBytes(size).toString("hex");
  } catch (error) {
    console.error("Error generating salt:", error);
    throw error;
  }
};

interface HttpRequestOptions {
  hostname: string;
  port: number;
  path: string;
  method: string;
  headers: Record<string, string | number>;
}

const httpRequest = async (
  options: HttpRequestOptions,
  body: Record<string, unknown> | null
): Promise<RapydResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const bodyString = body ? JSON.stringify(body) : "";

      log && console.log(`httpRequest options: ${JSON.stringify(options)}`);

      const req = https.request(options, (res) => {
        let responseData = "";
        const response: Omit<RapydResponse, "body"> & { body: string } = {
          statusCode: res.statusCode ?? 500,
          headers: res.headers,
          body: "",
        };

        res.on("data", (data: Buffer) => {
          responseData += data.toString();
        });

        res.on("end", () => {
          try {
            const parsedBody = responseData ? JSON.parse(responseData) : {};
            const fullResponse: RapydResponse = {
              ...response,
              body: parsedBody,
            };

            log &&
              console.log(
                `httpRequest response: ${JSON.stringify(fullResponse)}`
              );

            if (fullResponse.statusCode !== 200) {
              return reject(fullResponse);
            }

            return resolve(fullResponse);
          } catch (error) {
            reject(new Error("Failed to parse response body"));
          }
        });
      });

      req.on("error", (error: Error) => {
        reject(error);
      });

      req.write(bodyString);
      req.end();
    } catch (error) {
      reject(error);
    }
  });
};

export { makeRequest, type RapydRequestOptions, type RapydResponse };
