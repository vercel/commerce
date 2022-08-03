import type { RawSignUpRequest, SignupBody } from '../types/signup'

export const mapCommerceToRawRequest = ({
  email,
  firstName,
  lastName,
  password,
}: SignupBody): Partial<RawSignUpRequest> => ({
  first_name: firstName,
  last_name: lastName,
  email,
  password,
  password_confirmation: password,
  terms: true,
})
