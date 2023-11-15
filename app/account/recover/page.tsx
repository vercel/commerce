import { recoverCustomersPassword } from 'lib/shopify';
import { revalidatePath } from 'next/cache';
import AuthLayout from '../component/auth-layout';
import FormButton from '../component/form-button';
import FormFooter from '../component/form-footer';
import FormHeader from '../component/form-header';

let emailError: string | null = null;
let isSubmited: boolean = false;
const headings = {
	submited: {
		title: 'Request Sent.',
		description:
			'If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.',
	},
	default: {
		title: 'Forgot Password.',
		description:
			'Enter the email address associated with your account to receive a link to reset your password.',
	},
};

export default function RecoverPassword() {
	async function handleSubmit(data: FormData) {
		'use server';
		try {
			const response = await recoverCustomersPassword({
				variables: {
					email: data.get('email') as string,
				},
			});

			if (response.body.data.customerRecover.customerUserErrors.length > 0) {
				response.body.data.customerRecover.customerUserErrors.filter(
					(error: any) => {
						if (error.field && error.field.includes('email')) {
							emailError = error.message;
						}
					}
				);
			} else {
				isSubmited = true;
			}
		} catch (error) {
			interface ERROR {
				message: string;
			}
			const err = error as { error: ERROR };
			emailError = err.error.message;
		}

		revalidatePath('/account/recover');
	}

	return (
		<AuthLayout>
			<FormHeader title={headings[isSubmited ? 'submited' : 'default'].title} />
			<p className="mt-4">
				{headings[isSubmited ? 'submited' : 'default'].description}
			</p>
			{!isSubmited && (
				<form
					action={handleSubmit}
					noValidate
					className="pt-6 pb-8 mt-4 mb-4 space-y-3"
				>
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
						{emailError && (
							<p className="text-red-500 text-xs">{emailError} &nbsp;</p>
						)}
					</div>
					<FormButton btnText={'Request Reset Link'} />
					<FormFooter page="recover" />
				</form>
			)}
		</AuthLayout>
	);
}
