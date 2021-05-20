import login from '@commerce/api/endpoints/login'
import { LoginAPI, operations } from '@framework/api/endpoints/login'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: login as LoginAPI['endpoint']['handler'],
  operations,
})
