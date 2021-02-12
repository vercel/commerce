import type { Customer } from '../types'
import type {
  Prop,
  HookFetcherFn,
  UseHookInput,
  UseHookResponse,
} from '../utils/types'
import defaultFetcher from '../utils/default-fetcher'
import useData from '../utils/use-data'
import { Provider, useCommerce } from '..'

export type UseCustomerHandler<P extends Provider> = Prop<
  Prop<P, 'customer'>,
  'useCustomer'
>

export type UseCustomerInput<P extends Provider> = UseHookInput<
  UseCustomerHandler<P>
>

export type CustomerResponse<P extends Provider> = UseHookResponse<
  UseCustomerHandler<P>
>

export type UseCustomer<P extends Provider> = Partial<
  UseCustomerInput<P>
> extends UseCustomerInput<P>
  ? (input?: UseCustomerInput<P>) => CustomerResponse<P>
  : (input: UseCustomerInput<P>) => CustomerResponse<P>

export const fetcher = defaultFetcher as HookFetcherFn<Customer | null>

export default function useCustomer<P extends Provider>(
  input: UseCustomerInput<P> = {}
) {
  const { providerRef, fetcherRef } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.customer?.useCustomer

  const fetcherFn = opts?.fetcher ?? fetcher
  const useHook = opts?.useHook ?? ((ctx) => ctx.useData())

  return useHook({
    input,
    useData(ctx) {
      const response = useData(
        { ...opts!, fetcher: fetcherFn },
        ctx?.input ?? [],
        provider.fetcher ?? fetcherRef.current,
        ctx?.swrOptions ?? input.swrOptions
      )
      return response
    },
  })
}
