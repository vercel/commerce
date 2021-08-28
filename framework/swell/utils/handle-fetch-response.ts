import { CommerceError } from '@commerce/utils/errors'

type SwellFetchResponse = {
  error: {
    message: string
    code?: string
  }
}

const handleFetchResponse = async (res: SwellFetchResponse) => {
  if (res) {
    if (res.error) {
      throw new CommerceError(res.error)
    }
    return res
  }
}

export default handleFetchResponse
