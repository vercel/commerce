'use server';

import { GeinsCore } from '@geins/core';
import { PAYMENT_ID } from './constants';
import { cartAddMutation } from './queries/mutations/cart-add';
import { cartUpdateMutation } from './queries/mutations/cart-line-update';
import { checkoutMutation } from './queries/mutations/checkout';
import { cartCreateQuery } from './queries/queries/cart-create';
import { cartGetQuery } from './queries/queries/cart-get';
import { reshapeCart, reshapeCheckout } from './reshape';
import { CartItemInputType, PageType } from './types';

export const createCart = async (geinsCore: GeinsCore): Promise<any> => {
  const data = await geinsCore.graphql.query({
    queryAsString: cartCreateQuery,
    variables: {},
    requestOptions: { fetchPolicy: 'no-cache' }
  });
  if (!data || !data.getCart) {
    return {};
  }
  return reshapeCart(data.getCart);
};

export const getCart = async (geinsCore: GeinsCore, id: string | undefined): Promise<any> => {
  const data = await geinsCore.graphql.query({
    queryAsString: cartGetQuery,
    variables: { id },
    requestOptions: { fetchPolicy: 'no-cache' }
  });
  if (!data || !data.getCart) {
    return {};
  }
  return reshapeCart(data.getCart);
};

export const addToCart = async (
  geinsCore: GeinsCore,
  id: string,
  item: CartItemInputType
): Promise<any> => {
  const data = await geinsCore.graphql.mutation({
    queryAsString: cartAddMutation,
    variables: { id: id, item: item },
    requestOptions: { fetchPolicy: 'no-cache' }
  });
  if (!data || !data.addToCart) {
    return {};
  }
  return reshapeCart(data.addToCart);
};

export const removeFromCart = async (
  geinsCore: GeinsCore,
  id: string,
  itemId: string
): Promise<any> => {
  const item = {
    id: itemId,
    quantity: 0
  };
  const data = await geinsCore.graphql.mutation({
    queryAsString: cartUpdateMutation,
    variables: { id, item },
    requestOptions: { fetchPolicy: 'no-cache' }
  });
  if (!data || !data.updateCartItem) {
    return {};
  }
  return reshapeCart(data.updateCartItem);
};

export const updateCart = async (
  geinsCore: GeinsCore,
  id: string,
  item: CartItemInputType
): Promise<any> => {
  const data = await geinsCore.graphql.mutation({
    queryAsString: cartUpdateMutation,
    variables: { id, item },
    requestOptions: { fetchPolicy: 'no-cache' }
  });
  if (!data || !data.updateCartItem) {
    return {};
  }
  return reshapeCart(data.updateCartItem);
};

export const getCheckoutPage = async (geinsCore: GeinsCore, cartId: string): Promise<PageType> => {
  const variables = {
    cartId: cartId,
    checkout: {
      paymentId: PAYMENT_ID
    }
  };
  const data = await geinsCore.graphql.mutation({
    queryAsString: checkoutMutation,
    variables,
    requestOptions: { fetchPolicy: 'no-cache' }
  });
  return reshapeCheckout(data);
};
