import { GetAPISchema, createEndpoint } from '@commerce/api'
import signupEndpoint from '@commerce/api/endpoints/signup'
import type { SignupSchema } from '../../../../commerce/types/signup'
import type { ElasticpathAPI } from '../..'
import signup from './signup'

export type SignupAPI = GetAPISchema<ElasticpathAPI, SignupSchema>

export type SignupEndpoint = SignupAPI['endpoint']

export const handlers: SignupEndpoint['handlers'] = { signup }

const signupApi = createEndpoint<SignupAPI>({
    handler: signupEndpoint,
    handlers,
})

export default signupApi
