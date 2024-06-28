import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const CUSTOMER_API_URL = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL!;
export const CUSTOMER_API_CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID || '';
export const ORIGIN_URL = process.env.SHOPIFY_ORIGIN_URL || '';
export const USER_AGENT = '*';

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
  const [header, payload, signature] = token.split('.');
  const decodedHeader = JSON.parse(atob(header || ''));
  const decodedPayload = JSON.parse(atob(payload || ''));
  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature
  };
}

export async function initialAccessToken(
  request: NextRequest,
  newOrigin: string,
  customerAccountApiUrl: string,
  clientId: string
) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  /*
  STEP 1: Check for all necessary cookies and other information
  */
  if (!code) {
    console.log('Error: No Code Auth');
    return { success: false, message: `No Code` };
  }
  if (!state) {
    console.log('Error: No State Auth');
    return { success: false, message: `No State` };
  }
  const shopState = request.cookies.get('shop_state');
  const shopStateValue = shopState?.value;
  if (!shopStateValue) {
    console.log('Error: No Shop State Value');
    return { success: false, message: `No Shop State` };
  }
  if (state !== shopStateValue) {
    console.log('Error: Shop state mismatch');
    return { success: false, message: `No Shop State Mismatch` };
  }
  const codeVerifier = request.cookies.get('shop_verifier');
  const codeVerifierValue = codeVerifier?.value;
  if (!codeVerifierValue) {
    console.log('No Code Verifier');
    return { success: false, message: `No Code Verifier` };
  }
  /*
  STEP 2: GET ACCESS TOKEN
  */
  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('client_id', clientId);
  body.append('redirect_uri', `${newOrigin}/api/authorize`);
  body.append('code', code);
  body.append('code_verifier', codeVerifier?.value);
  const userAgent = '*';
  const headersNew = new Headers();
  headersNew.append('Content-Type', 'application/x-www-form-urlencoded');
  headersNew.append('User-Agent', userAgent);
  headersNew.append('Origin', newOrigin || '');
  const tokenRequestUrl = `${customerAccountApiUrl}/auth/oauth/token`;

  const response = await fetch(tokenRequestUrl, {
    method: 'POST',
    headers: headersNew,
    body
  });

  if (!response.ok) {
    const error = await response.text();
    console.log('data response error auth', error);
    console.log('response auth', response.status);
    return { success: false, message: `Response error auth` };
  }
  const data = await response.json();
  if (data?.errors) {
    const errorMessage = data?.errors?.[0]?.message ?? 'Unknown error auth';
    return { success: false, message: `${errorMessage}` };
  }
  const nonce = await getNonce(data?.id_token || '');
  const nonceValue = nonce.payload.nonce;
  const shopNonce = request.cookies.get('shop_nonce');
  const shopNonceValue = shopNonce?.value;
  if (nonceValue !== shopNonceValue) {
    console.log('Error nonce match');
    return { success: false, message: `Error: Nonce mismatch` };
  }
  return { success: true, data };
}

export async function exchangeAccessToken(
  token: string,
  customerAccountId: string,
  customerAccountApiUrl: string,
  origin: string
) {
  const clientId = customerAccountId;
  //this is a constant - see the docs. https://shopify.dev/docs/api/customer#useaccesstoken-propertydetail-audience
  const customerApiClientId = '30243aa5-17c1-465a-8493-944bcc4e88aa';
  const accessToken = token;
  const body = new URLSearchParams();
  body.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
  body.append('client_id', clientId);
  body.append('audience', customerApiClientId);
  body.append('subject_token', accessToken);
  body.append('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
  body.append('scopes', 'https://api.customers.com/auth/customer.graphql');

  const userAgent = '*';

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('User-Agent', userAgent);
  headers.append('Origin', origin);

  // Token Endpoint goes here
  const response = await fetch(`${customerAccountApiUrl}/auth/oauth/token`, {
    method: 'POST',
    headers,
    body
  });

  const data = await response.json();
  if (data.error) {
    return { success: false, data: data?.error_description };
  }
  return { success: true, data };
}

export async function refreshToken({ request, origin }: { request: NextRequest; origin: string }) {
  const newBody = new URLSearchParams();
  const refreshToken = request.cookies.get('shop_refresh_token');
  const refreshTokenValue = refreshToken?.value;
  if (!refreshTokenValue) {
    console.log('Error: No Refresh Token');
    return { success: false, message: `no_refresh_token` };
  }
  const clientId = CUSTOMER_API_CLIENT_ID;
  newBody.append('grant_type', 'refresh_token');
  newBody.append('refresh_token', refreshTokenValue);
  newBody.append('client_id', clientId);
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'User-Agent': USER_AGENT,
    Origin: origin
  };
  const tokenRequestUrl = `${CUSTOMER_API_URL}/auth/oauth/token`;
  const response = await fetch(tokenRequestUrl, {
    method: 'POST',
    headers,
    body: newBody
  });

  if (!response.ok) {
    const text = await response.text();
    console.log('response error in refresh token', text);
    return { success: false, message: `no_refresh_token` };
  }
  const data = await response.json();
  console.log('data response from initial fetch to refresh', data);
  const { access_token, expires_in, refresh_token } = data;

  const customerAccessToken = await exchangeAccessToken(
    access_token,
    clientId,
    CUSTOMER_API_URL,
    origin
  );
  // console.log("Customer Access Token in refresh request", customerAccessToken)
  if (!customerAccessToken.success) {
    return { success: false, message: `no_refresh_token` };
  }

  //const expiresAt = new Date(new Date().getTime() + (expires_in - 120) * 1000).getTime() + ''
  //const idToken = id_token

  return {
    success: true,
    data: { customerAccessToken: customerAccessToken.data.access_token, expires_in, refresh_token }
  };
}

export async function checkExpires({
  request,
  expiresAt,
  origin
}: {
  request: NextRequest;
  expiresAt: string;
  origin: string;
}) {
  let isExpired = false;
  if (parseInt(expiresAt, 10) - 1000 < new Date().getTime()) {
    isExpired = true;
    console.log('Isexpired is true, we are running refresh token!');
    const refresh = await refreshToken({ request, origin });
    console.log('refresh', refresh);
    //this will return success: true or success: false - depending on result of refresh
    return { ranRefresh: isExpired, refresh };
  }
  console.log('is expired is false - just sending back success', isExpired);
  return { ranRefresh: isExpired, success: true };
}

export function removeAllCookies(response: NextResponse) {
  //response.cookies.delete('shop_auth_token') //never set. We don't use it anywhere.
  response.cookies.delete('shop_customer_token');
  response.cookies.delete('shop_refresh_token');
  response.cookies.delete('shop_id_token');
  response.cookies.delete('shop_state');
  response.cookies.delete('shop_nonce');
  response.cookies.delete('shop_verifier');
  response.cookies.delete('shop_expires_at');
  return response;
}

export async function removeAllCookiesServerAction() {
  cookies().delete('shop_customer_token');
  cookies().delete('shop_refresh_token');
  cookies().delete('shop_id_token');
  cookies().delete('shop_state');
  cookies().delete('shop_nonce');
  cookies().delete('shop_verifier');
  cookies().delete('shop_expires_at');
  return { success: true };
}

export async function createAllCookies({
  response,
  customerAccessToken,
  expires_in,
  refresh_token,
  expiresAt,
  id_token
}: {
  response: NextResponse;
  customerAccessToken: string;
  expires_in: number;
  refresh_token: string;
  expiresAt: string;
  id_token?: string;
}) {
  response.cookies.set('shop_customer_token', customerAccessToken, {
    httpOnly: true, //if true can only read the cookie in server
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: expires_in //value from shopify, seems like this is 2 hours
  });

  //you need to set an expiration here, because otherwise its a sessions cookie
  //and will disappear after the user closes the browser and then we can never refresh - same with expires at below
  response.cookies.set('shop_refresh_token', refresh_token, {
    httpOnly: true, //if true can only read the cookie in server
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 604800 //one week
  });

  //you need to set an expiration here, because otherwise its a sessions cookie
  //and will disappear after the user closes the browser and then we can never refresh
  response.cookies.set('shop_expires_at', expiresAt, {
    httpOnly: true, //if true can only read the cookie in server
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 604800 //one week
  });

  //required for logout - this must be the same as the original expires - it;s long lived so they can logout, otherwise it will expire
  //because that's how we got the token, if this is different, it won't work
  //we don't always send in id_token here. For example, on refresh it's not available, it's only sent in on the initial authorization
  if (id_token) {
    response.cookies.set('shop_id_token', id_token, {
      httpOnly: true, //if true can only read the cookie in server
      sameSite: 'lax', //should be lax???
      secure: true,
      path: '/',
      maxAge: 604800 //one week
    });
  }

  return response;
}
export async function isLoggedIn(request: NextRequest, origin: string) {
  const customerToken = request.cookies.get('shop_customer_token');
  const customerTokenValue = customerToken?.value;
  const refreshToken = request.cookies.get('shop_refresh_token');
  const refreshTokenValue = refreshToken?.value;

  const newHeaders = new Headers(request.headers);
  if (!customerTokenValue && !refreshTokenValue) {
    const redirectUrl = new URL(`${origin}`);
    const response = NextResponse.redirect(`${redirectUrl}`);
    return removeAllCookies(response);
  }

  const expiresToken = request.cookies.get('shop_expires_at');
  const expiresTokenValue = expiresToken?.value;
  if (!expiresTokenValue) {
    const redirectUrl = new URL(`${origin}`);
    const response = NextResponse.redirect(`${redirectUrl}`);
    return removeAllCookies(response);
    //return { success: false, message: `no_expires_at` }
  }
  const isExpired = await checkExpires({
    request: request,
    expiresAt: expiresTokenValue,
    origin: origin
  });
  console.log('is Expired?', isExpired);
  //only execute the code below to reset the cookies if it was expired!
  if (isExpired.ranRefresh) {
    const isSuccess = isExpired?.refresh?.success;
    if (!isSuccess) {
      const redirectUrl = new URL(`${origin}`);
      const response = NextResponse.redirect(`${redirectUrl}`);
      return removeAllCookies(response);
      //return { success: false, message: `no_refresh_token` }
    } else {
      const refreshData = isExpired?.refresh?.data;
      //console.log ("refresh data", refreshData)
      console.log('We used the refresh token, so now going to reset the token and cookies');
      const newCustomerAccessToken = refreshData?.customerAccessToken;
      const expires_in = refreshData?.expires_in;
      //const test_expires_in = 180 //to test to see if it expires in 60 seconds!
      const expiresAt = new Date(new Date().getTime() + (expires_in! - 120) * 1000).getTime() + '';
      newHeaders.set('x-shop-customer-token', `${newCustomerAccessToken}`);
      const resetCookieResponse = NextResponse.next({
        request: {
          // New request headers
          headers: newHeaders
        }
      });
      return await createAllCookies({
        response: resetCookieResponse,
        customerAccessToken: newCustomerAccessToken,
        expires_in,
        refresh_token: refreshData?.refresh_token,
        expiresAt
      });
    }
  }

  newHeaders.set('x-shop-customer-token', `${customerTokenValue}`);
  console.log('Customer Token', customerTokenValue);
  return NextResponse.next({
    request: {
      // New request headers
      headers: newHeaders
    }
  });
}

//when we are running on the production website we just get the origin from the request.nextUrl
export function getOrigin(request: NextRequest) {
  const nextOrigin = request.nextUrl.origin;
  console.log('Current Origin', nextOrigin);
  //when running localhost, we want to use fake origin otherwise we use the real origin
  let newOrigin = nextOrigin;
  if (nextOrigin === 'https://localhost:3000' || nextOrigin === 'http://localhost:3000') {
    newOrigin = ORIGIN_URL;
  } else {
    newOrigin = nextOrigin;
  }
  console.log('New Origin', newOrigin);
  return newOrigin;
}

export async function authorize(request: NextRequest, origin: string) {
  const clientId = CUSTOMER_API_CLIENT_ID;
  const newHeaders = new Headers(request.headers);
  /***
  STEP 1: Get the initial access token or deny access
  ****/
  const dataInitialToken = await initialAccessToken(request, origin, CUSTOMER_API_URL, clientId);
  console.log('data initial token', dataInitialToken);
  if (!dataInitialToken.success) {
    console.log('Error: Access Denied. Check logs', dataInitialToken.message);
    newHeaders.set('x-shop-access', 'denied');
    return NextResponse.json({
      request: {
        // New request headers
        headers: newHeaders
      }
    });
  }
  const { access_token, expires_in, id_token, refresh_token } = dataInitialToken.data;
  /***
  STEP 2: Get a Customer Access Token
  ****/
  const customerAccessToken = await exchangeAccessToken(
    access_token,
    clientId,
    CUSTOMER_API_URL,
    origin || ''
  );
  console.log('customer access token', customerAccessToken);
  if (!customerAccessToken.success) {
    console.log('Error: Customer Access Token');
    newHeaders.set('x-shop-access', 'denied');
    return NextResponse.json({
      request: {
        // New request headers
        headers: newHeaders
      }
    });
  }
  //console.log("customer access Token", customerAccessToken.data.access_token)
  /**STEP 3: Set Customer Access Token cookies
  We are setting the cookies here b/c if we set it on the request, and then redirect
  it doesn't see to set sometimes
  **/
  newHeaders.set('x-shop-access', 'allowed');
  /*
  const authResponse = NextResponse.next({
    request: {
      // New request headers
      headers: newHeaders,
    },
  })
  */
  const accountUrl = new URL(`${origin}/account`);
  const authResponse = NextResponse.redirect(`${accountUrl}`);

  //sets an expires time 2 minutes before expiration which we can use in refresh strategy
  //const test_expires_in = 180 //to test to see if it expires in 60 seconds!
  const expiresAt = new Date(new Date().getTime() + (expires_in! - 120) * 1000).getTime() + '';
  console.log('expires at', expiresAt);

  return await createAllCookies({
    response: authResponse,
    customerAccessToken: customerAccessToken?.data?.access_token,
    expires_in,
    refresh_token,
    expiresAt,
    id_token
  });
}
