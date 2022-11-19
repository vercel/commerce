import { z } from 'zod'

export const getCustomerAddressBodySchema = z.object({
  cartId: z.string(),
})

export const customerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  notes: z.string().optional(),
  acceptsMarketing: z.boolean().optional(),
})

export const addressSchema = z.object({
  id: z.string(),
  mask: z.string(),
})

export const addressFieldsSchema = z.object({
  type: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  streetNumber: z.string(),
  apartments: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
})

export const addAddressBodySchema = z.object({
  cartId: z.string(),
  item: addressFieldsSchema,
})

export const updateAddressBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
  item: addressFieldsSchema,
})

export const deleteAddressBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
})

export const cardFieldsSchema = z.object({
  cardHolder: z.string(),
  cardNumber: z.string(),
  cardExpireDate: z.string(),
  cardCvc: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  streetNumber: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
})

export const cardSchema = z.object({
  id: z.string(),
  mask: z.string(),
})

export const addCardBodySchema = z.object({
  cartId: z.string(),
  item: cardFieldsSchema,
})

export const updateCardBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
  item: cardFieldsSchema,
})

export const deleteCardBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
})
