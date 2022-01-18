import * as Core from '@vercel/commerce/types/login'
import type { CustomerUserAuthInfoInput } from '../../schema'

export * from '@vercel/commerce/types/login'

export type LoginOperation = Core.LoginOperation & {
  variables: CustomerUserAuthInfoInput
}
