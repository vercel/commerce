import * as Core from '@commerce/types/login'
import type { LoginMutationVariables } from '../schema'

export * from '@commerce/types/login'

export type LoginOperation = Core.LoginOperation & {
  variables: LoginMutationVariables
}
