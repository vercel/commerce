import { createEndpoint, GetAPISchema } from '@commerce/api';
import signupEndpoint from '@commerce/api/endpoints/signup';
import { SignupSchema } from '@commerce/types/signup';
import { OrdercloudAPI } from '@framework/api';
import { passwordLogin } from '@framework/api/utils/fetch-rest';

const signup: SignupEndpoint['handlers']['signup'] = async ({
    req,
    res,
    body: { firstName, lastName, email, password },
    config: { restBuyerFetch, commerceUrl, tokenCookie },
}) => {
  // TODO: Add proper validations with something like Ajv
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  // TODO: validate the password and email
  // Passwords must be at least 7 characters and contain both alphabetic
  // and numeric characters.

    // Get token from cookies
  const token = req.cookies[tokenCookie];

  const newUser = {
      Active: true,
      Username: email,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      Email: email
  }



  // create user record
  try {
    await restBuyerFetch(
        'PUT',
        `/me/register?anonUserToken=${token}`,
        newUser,
        { token }
    );
  } catch (error) {
      var message = (error as any).errors[0].message
    //const ordercloud_error = JSON.parse();
    console.log(message)
    return res.status(400).json({
        data: null,
        errors: [
          {
            message: message,
            code: message
          },
        ],
      })
  }

  // Login the customer right after creating it
  await passwordLogin(email, password, commerceUrl);

  res.status(200).json({ data: null })
}

export type SignupAPI = GetAPISchema<OrdercloudAPI, SignupSchema>

export type SignupEndpoint = SignupAPI['endpoint']

export const handlers: SignupEndpoint['handlers'] = { signup }

const signupApi = createEndpoint<SignupAPI>({
  handler: signupEndpoint,
  handlers,
})

export default signupApi

