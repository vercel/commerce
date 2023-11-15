import { resetCustomersPassword } from 'lib/shopify';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthLayout from '../../../component/AuthLayout';
import FormButton from '../../../component/FormButton';
import FormHeader from '../../../component/FormHeader';

let errorMessage: string | null = null;
let passwordError: string | null = null;
let passwordConfirmError: string | null = null;

export default function ResetPassword({
	params,
}: {
	params: { id: string; resetToken: string };
}) {
	const handleSubmit = async (data: FormData) => {
		'use server';
		const id = params.id;
		const resetToken = params.resetToken;

		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;

		if (
			!password ||
			!passwordConfirm ||
			typeof password !== 'string' ||
			typeof passwordConfirm !== 'string' ||
			password !== passwordConfirm
		) {
			passwordConfirmError = 'The two passwords entered did not match.';
		} else {
			const res = await resetCustomersPassword({
				variables: {
					id: `gid://shopify/Customer/${id}`,
					input: {
						password,
						resetToken,
					},
				},
			});

			const customerAccessToken =
				res.body.data.customerReset.customerAccessToken;

			if (customerAccessToken) {
				const accessToken = customerAccessToken?.accessToken;
				cookies().set({
					name: 'customerAccessToken',
					value: accessToken,
					httpOnly: true,
					path: '/',
					expires: new Date(Date.now() + 20 * 60 * 1000 + 5 * 1000),
				});
				redirect('/account');
			}

			if (res.body.data.customerReset.customerUserErrors.length > 0) {
				res.body.data.customerReset.customerUserErrors.filter((error: any) => {
					if (error.field) {
						if (error.field.includes('password')) {
							passwordError = error.message;
						} else if (error.field.includes('passwordConfirm')) {
							passwordConfirmError = error.message;
						}
					}

					if (error.code === 'TOKEN_INVALID') {
						errorMessage = error.message;
					}
				});
			}
		}
		revalidatePath('/account/reset');
	};

	return (
		<AuthLayout>
			<FormHeader title="Reset Password." />
			<p className="mt-4">Enter a new password for your account.</p>
			{errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
			<form
				action={handleSubmit}
				noValidate
				className="pt-6 pb-8 mt-4 mb-4 space-y-3"
			>
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

				<div>
					<input
						className={`mb-1`}
						id="passwordConfirm"
						name="passwordConfirm"
						type="password"
						autoComplete="current-password"
						placeholder="Re-enter password"
						aria-label="Re-enter password"
						minLength={8}
						required
						autoFocus
					/>
					{passwordConfirmError && (
						<p className="text-red-500 text-xs">
							{' '}
							{passwordConfirmError} &nbsp;
						</p>
					)}
				</div>
				<FormButton btnText={'Save'} />
			</form>
		</AuthLayout>
	);
}
