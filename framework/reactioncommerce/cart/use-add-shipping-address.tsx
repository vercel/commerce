import { useCallback } from 'react'

import type {
  MutationHookContext,
  HookFetcherContext,
} from '@commerce/utils/types'

import { ValidationError } from '@commerce/utils/errors'

import useAddShippingAddress, {
  AddShippingAddressInput as AddShippingAddressInputBase,
  UseAddShippingAddress,
} from '@commerce/cart/use-add-shipping-address'

import useCart from './use-cart'
import {
  setShippingAddressOnCartMutation,
  getAnonymousCartToken,
  getAnonymousCartId,
  normalizeCart,
} from '../utils'
import { Cart, LineItem } from '../types'
import { Mutation, MutationUpdateCartItemsQuantityArgs } from '../schema'
import { AddShippingAddressBody } from '@commerce/types'

export type AddShippingAddressFn<T = any> = T extends LineItem
  ? (input?: AddShippingAddressInput<T>) => Promise<Cart | null>
  : (input: AddShippingAddressInput<T>) => Promise<Cart | null>

export type AddShippingAddressInput<T = any> = T extends LineItem
  ? Partial<AddShippingAddressInputBase>
  : AddShippingAddressInputBase

export default useAddShippingAddress as UseAddShippingAddress<typeof handler>

export const handler = {
  fetchOptions: {
    query: setShippingAddressOnCartMutation,
  },
  async fetcher({
    input: { address },
    options,
    fetch,
  }: HookFetcherContext<AddShippingAddressBody>) {
    const { setShippingAddressOnCart } = await fetch<
      Mutation,
      MutationUpdateCartItemsQuantityArgs
      >({
      ...options,
      variables: {
        input: {
          cartId: getAnonymousCartId(),
          cartToken: getAnonymousCartToken(),
          address: {
            address1: address.addressLine1,
            address2: address.addressLine2,
            city: address.city,
            company: address.company,
            country: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            fullName: `${address.firstName} ${address.lastName}`,
            phone: address.phone,
            postal: address.postalCode,
            region: address.region,
          },
        },
      },
    })
    return normalizeCart(setShippingAddressOnCart?.cart)
  },
  useHook: ({
    fetch,
  }: MutationHookContext<Cart | null, AddShippingAddressBody>) => <
    T extends LineItem | undefined = undefined
    >(
    ctx: { address?: T } = {}
  ) => {
    const { mutate } = useCart()
    const addShippingAddress: AddShippingAddressFn<LineItem> = async (input) => {
      const address = input?.address ?? ctx.address

      console.log('addShippingAddress input', input)
      if (!address) {
        throw new ValidationError({
          message: 'Invalid input used for this operation',
        })
      }

      const data = await fetch({ input: { address } })
      await mutate(data, false)
      return data
    }

    return useCallback(addShippingAddress as AddShippingAddressFn<T>, [fetch, mutate])
  },
}
