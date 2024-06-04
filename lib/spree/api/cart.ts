import spree from '@commerce/client';
import { IToken, ProductId } from '@commerce/types';
import { ensureIToken, setCartToken } from '@commerce/utils';
import { FetchError, IOrder, extractSuccess } from '@spree/storefront-api-v2-sdk';

/**
 * Checks if user authenticated, creates an empty cart (for user or guest)
 * and returns cart  @type {Cart}
 */
const createEmptyCart = async () => {
  const token: IToken | undefined = ensureIToken();
  const cartResponse = await extractSuccess(spree.cart.create(token));
  return cartResponse;
};

/**
 * Checks if token is present,
 * if not creates an empty cart and returns cart  @type {Cart}
 */
export const addProductToCart = async (productId: ProductId): Promise<IOrder | null> => {
  let cartResponse: IOrder | null;

  let token = ensureIToken();

  if (!token) {
    const cartCreateResponse = await createEmptyCart();
    setCartToken(cartCreateResponse.data.attributes.token);
    token = ensureIToken();
  }

  const addItemParams = {
    ...token,
    variant_id: productId,
    quantity: 1,
    include: [
      'line_items',
      'line_items.variant',
      'line_items.variant.product',
      'line_items.variant.product.images',
      'line_items.variant.images',
      'line_items.variant.option_values',
      'line_items.variant.product.option_types'
    ].join(',')
  };

  try {
    cartResponse = await extractSuccess(spree.cart.addItem(addItemParams));
  } catch (addItemError: unknown) {
    if ((addItemError as FetchError).status === 404) {
      throw new Error('No response from server');
    }

    cartResponse = null;
  }

  return cartResponse;
};
