import login from '@commerce/api/endpoints/login'
import { LoginAPI, handlers } from '@framework/api/endpoints/login'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: login as LoginAPI['endpoint']['handler'],
  handlers,
})
