import logout from '@commerce/api/endpoints/logout'
import { LogoutAPI, operations } from '@framework/api/logout'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: logout as LogoutAPI['endpoint']['handler'],
  operations,
})
