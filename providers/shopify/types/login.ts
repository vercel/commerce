import * as Core from '@commerce/types/login'
import type { CustomerAccessTokenCreateInput } from '../schema'

export * from '@commerce/types/login'

export type LoginOperation = Core.LoginOperation & {
  variables: CustomerAccessTokenCreateInput
}
