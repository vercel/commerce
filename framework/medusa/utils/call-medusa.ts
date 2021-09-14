import { CommerceError } from '@commerce/utils/errors'
import { MEDUSA_PUBLIC_STORE_URL } from '@framework/const'
import medusa from '../medusa'
import fetch from 'node-fetch'
import axios from 'axios'

export const callMedusa = async (
  method: string,
  query: string,
  variables: any
) => {
  switch (query) {
    case 'auth':
      if (method === 'authenticate') {
        const { email, password } = variables

        if (!email || !password) {
          throw new CommerceError({
            message: 'An argument for email and password is required',
          })
        }

        return await medusa.auth.authenticate({
          email: email,
          password: password,
        })
      } else if (method === 'exists') {
        const { email } = variables

        if (!email) {
          throw new CommerceError({
            message: 'An argument for email is required',
          })
        }

        return await medusa.auth.exists(email)
      } else if (method === 'getSession') {
        return await medusa.auth.getSession()
      } else if ('logout') {
        //NOT WORKING
        return await fetch(`${MEDUSA_PUBLIC_STORE_URL}/store/auth`, {
          method: 'DELETE',
        })
      } else {
        throw new CommerceError({
          message: 'No valid method argument was provided',
        })
      }
    case 'carts':
      if (method === 'complete') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }

        return await medusa.carts.complete(cart_id)
      } else if (method === 'create') {
        const { payload } = variables

        return await medusa.carts.create(payload)
      } else if (method === 'createPaymentSessions') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }

        return await medusa.carts.createPaymentSessions(cart_id)
      } else if (method === 'deletePaymentSessions') {
        const { cart_id, provider_id } = variables

        if (!(cart_id && provider_id)) {
          throw new CommerceError({
            message: 'An argument for cart_id and provider_id is required',
          })
        }

        return await medusa.carts.deletePaymentSession(cart_id, provider_id)
      } else if (method === 'refreshPaymentSession') {
        const { cart_id, provider_id } = variables

        if (!(cart_id && provider_id)) {
          throw new CommerceError({
            message: 'An argument for cart_id and provider_id is required',
          })
        }

        return await medusa.carts.refreshPaymentSession(cart_id, provider_id)
      } else if (method === 'updatePaymentSession') {
        const { cart_id, provider_id, data } = variables

        if (!(cart_id && provider_id)) {
          throw new CommerceError({
            message: 'An argument for cart_id and provider_id is required',
          })
        }

        return await medusa.carts.updatePaymentSession(cart_id, {
          provider_id,
          data,
        })
      } else if (method === 'setPaymentSession') {
        const { cart_id, provider_id } = variables

        if (!(cart_id && provider_id)) {
          throw new CommerceError({
            message: 'An argument for cart_id and provider_id is required',
          })
        }

        return await medusa.carts.setPaymentSession(cart_id, { provider_id })
      } else if (method === 'deleteDiscount') {
        const { cart_id, code } = variables

        if (!(cart_id && code)) {
          throw new CommerceError({
            message: 'An argument for cart_id and code is required',
          })
        }

        return await medusa.carts.deleteDiscount(cart_id, code)
      } else if (method === 'retrieve') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id and code is required',
          })
        }

        return await medusa.carts.retrieve(cart_id)
      } else if (method === 'update') {
        const { cart_id, payload } = variables

        if (!(cart_id && payload)) {
          throw new CommerceError({
            message: 'An argument for cart_id and payload is required',
          })
        }
        return await medusa.carts.update(cart_id, payload)
      } else if (method === 'addItem') {
        const { cart_id, payload } = variables
        const { variant_id, quantity } = payload

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }
        if (!(variant_id && quantity)) {
          throw new CommerceError({
            message: 'An argument for variant_id and quantity is required',
          })
        }

        return await medusa.carts.lineItems.create(cart_id, {
          variant_id: variant_id,
          quantity: quantity,
        })
      } else if (method === 'deleteItem') {
        const { cart_id, line_id } = variables

        if (!(cart_id && line_id)) {
          throw new CommerceError({
            message: 'An argument for cart_id and line_id is required',
          })
        }

        return await medusa.carts.lineItems.delete(cart_id, line_id)
      } else if (method === 'updateItem') {
        const { cart_id, line_id, payload } = variables

        if (!(cart_id && line_id && payload)) {
          throw new CommerceError({
            message: 'An argument for cart_id, line_id and payload is required',
          })
        }
        return await medusa.carts.lineItems.update(cart_id, line_id, payload)
      } else {
        throw new CommerceError({
          message: 'No valid method argument was provided',
        })
      }
    case 'customers':
      if (method === 'addAddresses') {
        const { customer_id, payload } = variables
        return await medusa.customers.addresses.addAddress(customer_id, payload)
      } else if (method === 'updateAddresses') {
        const { customer_id, address_id, payload } = variables
        return await medusa.customers.addresses.updateAddress(
          customer_id,
          address_id,
          payload
        )
      } else if (method === 'deleteAddress') {
        const { customer_id, address_id } = variables
        return await medusa.customers.addresses.deleteAddress(
          customer_id,
          address_id
        )
      } else if (method === 'listPaymentMethods') {
        const { customer_id } = variables
        return await medusa.customers.paymentMethods.list(customer_id)
      } else if (method === 'create') {
        const { payload } = variables

        if (!payload) {
          throw new CommerceError({
            message: 'An argument for payload is required',
          })
        }

        return await medusa.customers.create(payload)
      } else if (method === 'generatePasswordToken') {
        const { payload } = variables

        if (!payload) {
          throw new CommerceError({
            message: 'An argument for payload is required',
          })
        }

        return await medusa.customers.generatePasswordToken(payload)
      } else if (method === 'listOrders') {
        const { customer_id } = variables

        if (!customer_id) {
          throw new CommerceError({
            message: 'An argument for customer_id is required',
          })
        }
        return await medusa.customers.listOrders(customer_id)
      } else if (method === 'resetPassword') {
        const { payload } = variables

        if (!payload) {
          throw new CommerceError({
            message: 'An argument for payload is required',
          })
        }

        return await medusa.customers.resetPassword(payload)
      } else if (method === 'retrieve') {
        const { customer_id } = variables

        if (!customer_id) {
          throw new CommerceError({
            message: 'An argument for customer_id is required',
          })
        }

        return await medusa.customers.retrieve(customer_id)
      } else if (method === 'update') {
        const { customer_id, payload } = variables

        if (!customer_id) {
          throw new CommerceError({
            message: 'An argument for customer_id is required',
          })
        }

        return await medusa.customers.update(customer_id, payload)
      }
    case 'orders':
      if (method === 'lookupOrder') {
        const { payload } = variables

        if (!payload) {
          throw new CommerceError({
            message: 'An argument for payload is required',
          })
        }

        return await medusa.orders.lookupOrder(payload)
      } else if (method === 'retrieve') {
        const { order_id } = variables

        if (!order_id) {
          throw new CommerceError({
            message: 'An argument for order_id is required',
          })
        }

        return await medusa.orders.retrieve(order_id)
      } else if (method === 'retrieveByCartId') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }

        return await medusa.orders.retrieveByCartId(cart_id)
      }
    case 'products':
      if (method === 'variantsList') {
        const { params } = variables

        return await medusa.products.variants.list(params)
      } else if (method === 'variantsRetrieve') {
        const { variant_id } = variables

        if (!variant_id) {
          throw new CommerceError({
            message: 'An argument for variant_id is required',
          })
        }

        return await medusa.products.variants.retrieve(variant_id)
      } else if (method === 'list') {
        const { query } = variables
        let path = '/store/products'

        if (query) {
          const formattedQuery = {
            offset: query.offset || 0,
            limit: query.limit || 100,
          }

          const queryString = Object.entries(formattedQuery).map(
            ([key, value]) => {
              return `${key}=${value}`
            }
          )

          path = `/store/products?${queryString.join('&')}`
        }

        const res = await fetch(`${MEDUSA_PUBLIC_STORE_URL}${path}`, {
          method: 'GET',
        })

        return await res.json()
      } else if (method === 'retrieve') {
        const { product_id } = variables

        if (!product_id) {
          throw new CommerceError({
            message: 'An argument for product_id is required',
          })
        }

        return await medusa.products.retrieve(product_id)
      } else {
        throw new CommerceError({
          message: 'No valid method argument was provided',
        })
      }
    case 'returnReasons':
      if (method === 'list') {
        return await medusa.returnReasons.list()
      } else {
        throw new CommerceError({
          message: 'No valid method argument was provided',
        })
      }
    case 'returns':
      if (method === 'create') {
        const { payload } = variables

        if (!payload) {
          throw new CommerceError({
            message: 'An argument for payload is required',
          })
        }
        return await medusa.returns.create(payload)
      } else {
        throw new CommerceError({
          message: 'No valid method argument was provided',
        })
      }
    case 'shippingOptions':
      if (method === 'list') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }

        return await medusa.shippingOptions.list(cart_id)
      } else if (method === 'create') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }

        return await medusa.shippingOptions.listCartOptions(cart_id)
      } else {
        throw new CommerceError({
          message: 'No valid method argument was provided',
        })
      }
    case 'swaps':
      if (method === 'create') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }

        return await medusa.swaps.create({ cart_id })
      } else if (method === 'retrieve') {
        const { cart_id } = variables

        if (!cart_id) {
          throw new CommerceError({
            message: 'An argument for cart_id is required',
          })
        }

        return await medusa.swaps.retrieveByCartId(cart_id)
      } else {
        throw new CommerceError({
          message: 'No valid method argument was provided',
        })
      }
    default:
      throw new CommerceError({
        message: 'No valid query argument was provided',
      })
  }
}
