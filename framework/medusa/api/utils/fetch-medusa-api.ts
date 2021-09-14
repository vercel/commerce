import { callMedusa } from '@framework/utils/call-medusa'

const fetchApi = async (query: string, method: string, variables: any) => {
  const response = await callMedusa(method, query, variables)

  return response
}
export default fetchApi
