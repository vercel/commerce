import { commerce } from '../../lib/commercejs'
import Commerce from '@chec/commerce.js'

type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? K : never
}[keyof T]

// Provider TODO: Fix types here.

// Calls the relevant Commerce.js SDK method based on resource and method arguments.
export default async function sdkFetch<
  Resource extends keyof Commerce,
  Method extends MethodKeys<Commerce[Resource]>
>(
  resource: Resource,
  method: Method,
  ...variables: Parameters<Commerce[Resource][Method] | any>
): Promise<ReturnType<Commerce[Resource][Method] | any>> {
  const data = await commerce[resource as string][method](...variables)
  return data
}
