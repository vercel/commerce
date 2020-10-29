import { useContext } from 'react'
import { CommerceContext } from '../context'

export const useCommerce = () => {
  const context = useContext(CommerceContext)
  if (context === undefined) {
    throw new Error(`useCommerce must be used within a CommerceProvider`)
  }
  return context
}
