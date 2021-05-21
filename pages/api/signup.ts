import signup from '@commerce/api/endpoints/signup'
import { SignupAPI, handlers } from '@framework/api/endpoints/signup'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: signup as SignupAPI['endpoint']['handler'],
  handlers,
})
