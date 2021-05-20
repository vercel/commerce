import customer from '@commerce/api/endpoints/customer'
import { CustomerAPI, operations } from '@framework/api/endpoints/customer'
import commerce from '@lib/api/commerce'

export default commerce.endpoint({
  handler: customer as CustomerAPI['endpoint']['handler'],
  operations,
})
