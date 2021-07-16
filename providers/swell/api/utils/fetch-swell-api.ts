import { swellConfig } from '../..'

const fetchApi = async (query: string, method: string, variables: [] = []) => {
  const { swell } = swellConfig
  return swell[query][method](...variables)
}
export default fetchApi
