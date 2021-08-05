import * as Core from '@commerce/types/signup'

export * from '@commerce/types/signup'

export type SignupOperation = Core.SignupOperation & {
  variables: {
    email: string
    password: string
  }
}
