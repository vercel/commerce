import useAction from '../utils/use-action'
import type { CartItemBody } from '../types'

// Input expected by the action returned by the `useAddItem` hook
export type AddItemInput<T extends CartItemBody> = T

const useAddItem = useAction

export default useAddItem
