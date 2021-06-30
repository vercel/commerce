import Commercetools from '@framework/utils/commercetools'
import { provider } from '@framework/api'

const fetchProducts = async (query?: any, isSearch?: boolean) => {
  const { config } = provider
  const commercetools = Commercetools({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    projectKey: config.projectKey,
    host: config.host,
    oauthHost: config.oauthHost,
    concurrency: config.concurrency,
  })
  const { requestExecute } = commercetools
  try {
    if (isSearch) {
      return await requestExecute
        .productProjections()
        .search()
        .get({ queryArgs: query })
        .execute()
    } else {
      return await requestExecute
        .productProjections()
        .get({ queryArgs: query })
        .execute()
    }
  } catch (err) {
    throw err
  }
}

export default fetchProducts
