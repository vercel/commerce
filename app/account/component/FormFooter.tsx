import Link from 'next/link';

interface IFormFooter {
	page: 'login' | 'register' | 'recover';
}

export default function FormFooter({ page }: IFormFooter) {
	const data = {
		login: {
			linkText: 'Create an account',
			phrase: 'New to Hydrogen?',
			href: '/account/register',
		},
		register: {
			linkText: 'Sign In',
			phrase: 'Already have an account?',
			href: '/account/login',
		},
		recover: {
			linkText: 'Login',
			phrase: 'Return to',
			href: '/account/login',
		},
	};

	return (
		<div className="flex items-center justify-between gap-5 mt-8 border-t border-gray-300">
			<p className="align-baseline text-sm mt-6">
				{data[page].phrase}
				&nbsp;
				<Link className="inline underline" href={data[page].href}>
					{data[page].linkText}
				</Link>
			</p>
			{page === 'login' && (
				<Link
					className="mt-6 inline-block align-baseline text-sm text-primary/50x"
					href="/account/recover"
				>
					Forgot Password
				</Link>
			)}
		</div>
	);
}
