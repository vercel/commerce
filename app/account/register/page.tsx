import { createCustomer, loginCustomer } from 'lib/shopify';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthLayout from '../component/auth-layout';
import FormButton from '../component/form-button';
import FormFooter from '../component/form-footer';
import FormHeader from '../component/form-header';

let emailError: string | null = null;
let passwordError: string | null = null;

export default function RegisterPage() {
  async function handleSubmit(data: FormData) {
    'use server';
    const res = await createCustomer({
      variables: {
        input: {
          email: data.get('email') as string,
          password: data.get('password') as string,
		  firstName: data.get('firstname') as string,
		  lastName: data.get('lastname') as string
        }
      }
    });

    if (res.body.data.customerCreate.customer) {
      const loginRes = await loginCustomer({
        variables: {
          input: {
            email: data.get('email') as string,
            password: data.get('password') as string,
          }
        }
      });

      if (loginRes.body.data.customerAccessTokenCreate.customerAccessToken?.accessToken) {
        cookies().set({
          name: 'customerAccessToken',
          value: loginRes.body.data.customerAccessTokenCreate.customerAccessToken.accessToken,
          httpOnly: true,
          path: '/',
          expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000)
        });
        redirect('/account');
      }

      redirect('/account/login');
    }

    if (res.body.data.customerCreate.customerUserErrors.length > 0) {
      res.body.data.customerCreate.customerUserErrors.filter((error: any) => {
        if (error.field.includes('email')) {
          emailError = error.message;
        }
        if (error.field.includes('password')) {
          passwordError = error.message;
        }
      });
    }

    revalidatePath('/account/register');
  }

  return (
    <AuthLayout>
      <FormHeader title="Create an Account" />
      <form action={handleSubmit} noValidate className="mb-4 mt-4 space-y-3 pb-8 pt-6">
        <div>
          <input
            className={`mb-1`}
            id="firstname"
            name="firstname"
            type="text"
            required
            placeholder="First Name"
            aria-label="First Name"
            autoFocus
          />
        </div>

        <div>
          <input
            className={`mb-1`}
            id="lastname"
            name="lastname"
            type="text"
            autoComplete="email"
            required
            placeholder="Last Name"
            aria-label="Last Name"
            autoFocus
          />
        </div>

        <div>
          <input
            className={`mb-1`}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            aria-label="Email address"
            autoFocus
          />
          {emailError && <p className="text-xs text-red-500">{emailError} &nbsp;</p>}
        </div>
        <div>
          <input
            className={`mb-1`}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            minLength={8}
            required
            autoFocus
          />
          {passwordError && <p className="text-xs text-red-500"> {passwordError} &nbsp;</p>}
        </div>
        <FormButton btnText="Create Account" />
        <FormFooter page="register" />
      </form>
    </AuthLayout>
  );
}
