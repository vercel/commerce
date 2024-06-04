import { IOAuthToken } from '@spree/storefront-api-v2-sdk/dist/*';
import Cookies from 'js-cookie';
import { IToken } from './types';

export const getCartToken = () => Cookies.get('cartToken');

export const setCartToken = (cartToken: string) => {
  const date = new Date();
  const expires = date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  const cookieOptions = { expires };

  Cookies.set('cartToken', cartToken, cookieOptions);
};

export const removeCartToken = () => Cookies.remove('cartToken');

export const ensureIToken = (): IToken | undefined => {
  const userTokenResponse = ensureUserTokenResponse();

  if (userTokenResponse) return { bearer_token: userTokenResponse.access_token };

  const cartToken = getCartToken();

  if (cartToken) return { order_token: cartToken };

  return undefined;
};

/**
 * Retrieves the saved user token response. If the response fails json parsing,
 * removes the saved token and returns @type {undefined} instead.
 */
export const ensureUserTokenResponse = (): IOAuthToken | undefined => {};

export const getUserTokenResponse = (): IOAuthToken | undefined => {
  const stringifiedToken = Cookies.get('userToken');

  if (!stringifiedToken) return undefined;

  try {
    const token = JSON.parse(stringifiedToken);
    return token;
  } catch (parseError) {
    throw 'Could not parse stored user token response.';
  }
};

export const removeUserTokenResponse = () => Cookies.remove('userCookieName');
