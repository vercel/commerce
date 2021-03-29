import { swellConfig } from '../../index'

const fetchSwellApi = async (query: string, method: string) => {
  const { swell } = swellConfig
  const res = await swell[query][method]()

  return res
}
export default fetchSwellApi
