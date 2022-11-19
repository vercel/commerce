import type { CustomerCardSchema } from '../../../types/customer/card'
import type { GetAPISchema } from '../..'

import { z } from 'zod'

import {
  cardSchema,
  addCardBodySchema,
  deleteCardBodySchema,
  updateCardBodySchema,
} from '../../../schemas/customer'
import { parse, getInput } from '../../utils'

import validateHandlers from '../../utils/validate-handlers'

const customerCardEndpoint: GetAPISchema<
  any,
  CustomerCardSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers, config } = ctx

  validateHandlers(req, {
    GET: handlers['getCards'],
    POST: handlers['addItem'],
    PUT: handlers['updateItem'],
    DELETE: handlers['removeItem'],
  })

  let output
  const input = await getInput(req)
  const { cookies } = req

  // Cart id might be usefull for anonymous shopping
  const cartId = cookies.get(config.cartCookie)

  // Create or add a card
  if (req.method === 'GET') {
    const body = { ...input }
    return parse(
      await handlers['getCards']({ ...ctx, body }),
      z.array(cardSchema).optional()
    )
  }

  // Create or add an item to customer cards
  if (req.method === 'POST') {
    const body = addCardBodySchema.parse({ ...input, cartId })
    output = await handlers['addItem']({ ...ctx, body })
  }

  // Update item in customer cards
  if (req.method === 'PUT') {
    const body = updateCardBodySchema.parse({ ...input, cartId })
    output = await handlers['updateItem']({ ...ctx, body })
  }

  // Remove an item from customer cards
  if (req.method === 'DELETE') {
    const body = deleteCardBodySchema.parse({ ...input, cartId })

    return await handlers['removeItem']({ ...ctx, body })
  }

  return output ? parse(output, cardSchema.nullish()) : { status: 405 }
}

export default customerCardEndpoint
