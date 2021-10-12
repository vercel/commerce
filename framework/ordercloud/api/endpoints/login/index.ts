import { createEndpoint, GetAPISchema } from "@commerce/api"
import loginEndpoint from "@commerce/api/endpoints/login"
import { LoginSchema } from "@commerce/types/login"
import { OrdercloudAPI } from "@framework/api"
import login from "./login"

export type LoginAPI = GetAPISchema<OrdercloudAPI, LoginSchema>

export type LoginEndpoint = LoginAPI['endpoint']

export const handlers: LoginEndpoint['handlers'] = { login }

const loginApi = createEndpoint<LoginAPI>({
  handler: loginEndpoint,
  handlers,
})

export default loginApi
