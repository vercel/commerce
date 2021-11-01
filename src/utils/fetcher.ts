import { GraphQLClient } from 'graphql-request'
import { RequestDocument, Variables } from 'graphql-request/dist/types'
import { LOCAL_STORAGE_KEY } from './constanst.utils'

interface QueryOptions {
  query: RequestDocument
  variables?: Variables
  onLoad?: (loading: boolean) => any
  key?: string
}

const fetcher = async <T>(options: QueryOptions): Promise<T> => {
  const { query, variables } = options

  function* generator() {
    while (true) {
      const random = Math.random()
        .toString(16)
        .slice(2, 10);
      yield `0x${random}`;
    }
  }

  const preload = (knowObjects: any, refs: any, generate: any) => (reference = false) => {
    if (reference) {
      return refs;
    } else {
      return (object: any) => {
        let address;
        if (knowObjects.has(object)) {
          address = knowObjects.get(object);
        } else {
          address = generate.next().value;
          knowObjects.set(object, address);
          refs[address] = object;
        }
        return address;
      };
    }
  };

  const setup = preload(new Map(), {}, generator());
  const findRef = setup(false);

  if (variables?.customOption) {
    const array = findRef(variables)
    console.log("var: ", array, variables)
  }

  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL as string, {
    credentials: 'include',
    mode: 'cors',
    headers: token ? { Authorization: 'Bearer ' + token } : {},
  })

  const res = await graphQLClient.request<T>(
    query,
    variables,
  )

  return res
}

export default fetcher
