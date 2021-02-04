import useAction from '../utils/use-action'
import type { CartItemBody } from '../types'

// Input expected by the action returned by the `useUpdateItem` hook
export type UpdateItemInput<T extends CartItemBody> = T & {
  id: string
}

const useUpdateItem = useAction

export default useUpdateItem
