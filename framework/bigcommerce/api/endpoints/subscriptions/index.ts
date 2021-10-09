import { GetAPISchema, createEndpoint } from '@commerce/api'
import subscriptionsEndpoint from '@commerce/api/endpoints/subscriptions'
import type { SubscriptionsSchema } from '../../../types/subscriptions'
import type { BigcommerceAPI } from '../..'
import subscriptions from './subscriptions'

export type SubscriptionsAPI = GetAPISchema<BigcommerceAPI, SubscriptionsSchema>

export type SubscriptionsEndpoint = SubscriptionsAPI['endpoint']

export const handlers: SubscriptionsEndpoint['handlers'] = { subscriptions }

const subscriptionsApi = createEndpoint<SubscriptionsAPI>({
  handler: subscriptionsEndpoint,
  handlers,
})

export default subscriptionsApi
