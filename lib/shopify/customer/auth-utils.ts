// @ts-nocheck
export async function generateCodeVerifier() {
  const randomCode = generateRandomCode();
  return base64UrlEncode(randomCode);
}
export async function generateCodeChallenge(codeVerifier: string) {
  const digestOp = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(codeVerifier)
  );
  const hash = convertBufferToString(digestOp);
  return base64UrlEncode(hash);
}
function generateRandomCode() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return String.fromCharCode.apply(null, Array.from(array));
}
function base64UrlEncode(str: string) {
  const base64 = btoa(str);
  // This is to ensure that the encoding does not have +, /, or = characters in it.
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function convertBufferToString(hash: ArrayBuffer) {
  const uintArray = new Uint8Array(hash);
  const numberArray = Array.from(uintArray);
  return String.fromCharCode(...numberArray);
}

export async function generateRandomString() {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

export async function getNonce(token: string) {
  return decodeJwt(token).payload.nonce;
}
function decodeJwt(token: string) {
  const [header, payload, signature] = token.split('.');
  const decodedHeader = JSON.parse(atob(header || ''));
  const decodedPayload = JSON.parse(atob(payload || ''));
  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature
  };
}
