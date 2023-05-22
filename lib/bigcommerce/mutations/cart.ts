import { customItemFragment, digitalItemFragment, physicalItemFragment } from '../fragments/cart';

const addCartLineItemMutation = /* GraphQL */ `
  mutation addCartLineItems($addCartLineItemsInput: AddCartLineItemsInput!) {
    cart {
      addCartLineItems(input: $addCartLineItemsInput) {
        cart {
          entityId
          amount {
            currencyCode
            value
          }
          lineItems {
            totalQuantity
            physicalItems {
              ...physicalItem
            }
            digitalItems {
              ...digitalItem
            }
            customItems {
              ...customItem
            }
          }
        }
      }
    }
  }
  ${physicalItemFragment}
  ${digitalItemFragment}
  ${customItemFragment}
`;

const createCartMutation = /* GraphQL */ `
  mutation createCart($createCartInput: CreateCartInput!) {
    cart {
      createCart(input: $createCartInput) {
        cart {
          entityId
          amount {
            currencyCode
            value
          }
          lineItems {
            totalQuantity
            physicalItems {
              ...physicalItem
            }
            digitalItems {
              ...digitalItem
            }
            customItems {
              ...customItem
            }
            giftCertificates {
              name
            }
          }
        }
      }
    }
  }
  ${physicalItemFragment}
  ${digitalItemFragment}
  ${customItemFragment}
`;

const deleteCartLineItemMutation = /* GraphQL */ `
  mutation deleteCartLineItem($deleteCartLineItemInput: DeleteCartLineItemInput!) {
    cart {
      deleteCartLineItem(input: $deleteCartLineItemInput) {
        deletedLineItemEntityId
        deletedCartEntityId
        cart {
          entityId
          amount {
            currencyCode
            value
          }
          lineItems {
            physicalItems {
              ...physicalItem
            }
            digitalItems {
              ...digitalItem
            }
            customItems {
              ...customItem
            }
            totalQuantity
          }
        }
      }
    }
  }
  ${physicalItemFragment}
  ${digitalItemFragment}
  ${customItemFragment}
`;

const updateCartLineItemMutation = /* GraphQL */ `
  mutation updateCartLineItem($updateCartLineItemInput: UpdateCartLineItemInput!) {
    cart {
      updateCartLineItem(input: $updateCartLineItemInput) {
        cart {
          entityId
          amount {
            currencyCode
            value
          }
          updatedAt {
            utc
          }
          lineItems {
            totalQuantity
            physicalItems {
              ...physicalItem
            }
            digitalItems {
              ...digitalItem
            }
            customItems {
              ...customItem
            }
          }
        }
      }
    }
  }
  ${physicalItemFragment}
  ${digitalItemFragment}
  ${customItemFragment}
`;

const deleteCartMutation = /* GraphQL */ `
  mutation deleteCart($deleteCartInput: DeleteCartInput!) {
    cart {
      deleteCart(input: $deleteCartInput) {
        deletedCartEntityId
      }
    }
  }
`;

export {
  createCartMutation,
  addCartLineItemMutation,
  updateCartLineItemMutation,
  deleteCartLineItemMutation,
  deleteCartMutation
};
