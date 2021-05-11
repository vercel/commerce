import { swellConfig } from '../..'

const fetchSwellApi = async (
  query: string,
  method: string,
  variables: [] = []
) => {
  const { swell } = swellConfig
  return await swell[query][method](...variables)
}
export default fetchSwellApi
