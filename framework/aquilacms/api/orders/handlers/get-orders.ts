import type { OrdersHandlers } from '..'
import { normalizeOrder } from '../../../lib/normalize'

const getOrders: OrdersHandlers['getOrders'] = async ({ req, res, config }) => {
  const token = req.cookies[config.customerCookie]

  if (token) {
    try {
      const { datas } = await config.storeApiFetch('/v2/orders', {
        method: 'POST',
        body: JSON.stringify({
          lang: 'en',
          PostBody: {
            sort: { createdAt: -1 },
            populate: ['items.id'],
            limit: 6,
            page: 1,
          },
        }),
        headers: {
          authorization: token,
        },
      })
      return res
        .status(200)
        .json({ data: { orders: datas.map(normalizeOrder) } })
    } catch (err) {
      console.error(err)
    }
  }

  res.status(200).json({ data: null })
}

export default getOrders
