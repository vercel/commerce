import logout from '@commerce/api/endpoints/logout'
import { LogoutAPI, handlers } from '@framework/api/endpoints/logout'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: logout as LogoutAPI['endpoint']['handler'],
  handlers,
})
