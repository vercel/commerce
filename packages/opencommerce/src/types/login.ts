import * as Core from '@vercel/commerce/types/login'
import type { AuthenticateMutationVariables } from '../../schema'

export * from '@vercel/commerce/types/login'

export type LoginOperation = Core.LoginOperation & {
  variables: AuthenticateMutationVariables
}
