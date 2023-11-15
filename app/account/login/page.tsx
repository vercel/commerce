import { loginCustomer } from 'lib/shopify';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthLayout from '../component/AuthLayout';
import FormButton from '../component/FormButton';
import FormFooter from '../component/FormFooter';
import FormHeader from '../component/FormHeader';

let emailError: string | null = null;
let passwordError: string | null = null;
let unidentifiedUserError: string | null = null;
export default function LoginPage() {
	async function handleSubmit(data: FormData) {
		'use server';
		const loginRes = await loginCustomer({
			variables: {
				input: {
					email: data.get('email') as string,
					password: data.get('password') as string,
				},
			},
		});

		if (
			loginRes.body.data.customerAccessTokenCreate.customerAccessToken
				?.accessToken
		) {
			cookies().set({
				name: 'customerAccessToken',
				value:
					loginRes.body.data.customerAccessTokenCreate.customerAccessToken
						.accessToken,
				httpOnly: true,
				path: '/',
				expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
			});
			redirect('/account');
		}

		if (
			loginRes.body.data.customerAccessTokenCreate.customerUserErrors.length > 0
		) {
			loginRes.body.data.customerAccessTokenCreate.customerUserErrors.filter(
				(error: any) => {
					if (error.field) {
						if (error.field.includes('email')) {
							emailError = error.message;
						}
						if (error.field.includes('password')) {
							passwordError = error.message;
						}
					} else {
						if (error.code === 'UNIDENTIFIED_CUSTOMER') {
							unidentifiedUserError = error.message;
						}
					}
				}
			);
		}

		revalidatePath('/account/login');
	}

	return (
		<AuthLayout>
			<FormHeader title="Sign in." />
			{unidentifiedUserError && (
				<p className="text-red-500 mt-4">{unidentifiedUserError}</p>
			)}
			<form
				action={handleSubmit}
				noValidate
				className="pt-6 pb-8 mt-4 mb-4 space-y-3"
			>
				<div>
					<input
						className={`mb-1}`}
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder="Email address"
						aria-label="Email address"
						autoFocus
					/>
					{emailError && (
						<p className="text-red-500 text-xs">{emailError} &nbsp;</p>
					)}
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
					{passwordError && (
						<p className="text-red-500 text-xs"> {passwordError} &nbsp;</p>
					)}
				</div>
				<FormButton btnText="Sign in" />
				<FormFooter page="login" />
			</form>
		</AuthLayout>
	);
}
