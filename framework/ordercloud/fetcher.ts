import { Fetcher } from '@commerce/utils/types'

export const fetcher: Fetcher = async () => {
  throw new Error(
    'Client side fetching has not been implemented yet, try to fetch from server side.'
  )
}
