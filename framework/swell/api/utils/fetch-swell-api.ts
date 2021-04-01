import { swellConfig } from '../../index'

const fetchSwellApi = async (
  query: string,
  method: string,
  variables: object | string
) => {
  const { swell } = swellConfig
  const res = await swell[query][method](variables)

  return res
}
export default fetchSwellApi
