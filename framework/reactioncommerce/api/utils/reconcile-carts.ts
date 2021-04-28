import reconcileCartsMutation from '@framework/utils/mutations/reconcile-carts'

async function reconcileCarts({
  config,
  cartId,
  anonymousCartToken,
  reactionCustomerToken,
}) {
  const {
    data: {
      reconcileCarts: { cart: rawReconciledCart },
    },
  } = await config.fetch(
    reconcileCartsMutation,
    {
      variables: {
        input: {
          anonymousCartId: cartId,
          cartToken: anonymousCartToken,
          shopId: config.shopId,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${reactionCustomerToken}`,
      },
    }
  )

  return rawReconciledCart
}

export default reconcileCarts
