import signup from '@commerce/api/endpoints/signup'
import { SignupAPI, operations } from '@framework/api/endpoints/signup'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: signup as SignupAPI['endpoint']['handler'],
  operations,
})
