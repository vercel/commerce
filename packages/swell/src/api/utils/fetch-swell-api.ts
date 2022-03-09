import swell from '../../swell'

const fetchApi = async (query: string, method: string, variables: [] = []) => {
  return swell[query][method](...variables)
}

export default fetchApi
