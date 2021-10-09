
export type SubscriptionsBody = {
  email: string
  firstName: string
  lastName: string
  source: string
}

export type SubscriptionsTypes = {
  body: SubscriptionsBody
}

// export type SubscriptionsHook<T extends SubscriptionsTypes = SubscriptionsTypes> = {
//   data: null
//   body: T['body']
//   actionInput: T['body']
//   fetcherInput: T['body']
// }

export type SubscriptionsHook<T extends SubscriptionsTypes = SubscriptionsTypes> = {
  data: any
  input?: any
  fetcherInput: any
  body: { item: any }
  actionInput: any
}

export type SubscriptionsSchema<T extends SubscriptionsTypes = SubscriptionsTypes> = {
  endpoint: {
    options: {}
    handlers: {
      subscriptions: SubscriptionsHook<T>
    }
  }
}
