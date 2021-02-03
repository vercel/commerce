import useAction from '../utils/use-action'

// Input expected by the action returned by the `useRemoveItem` hook
export interface RemoveItemInput {
  id: string
}

const useRemoveItem = useAction

export default useRemoveItem
