import * as Core from '@commerce/types/login'

export * from '@commerce/types/login'

export type LoginOperation = Core.LoginOperation & {
  variables: {
    email: string
    password: string
  }
}
