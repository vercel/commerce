import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function SignOutSection() {
	const signOut = async () => {
		'use server';
		cookies().set({
			name: 'customerAccessToken',
			value: '',
			httpOnly: true,
			path: '/',
			expires: new Date(Date.now()),
		});
		redirect('/account/login');
	};
	return (
		<form action={signOut} noValidate>
			<button type="submit" className="text-primary/50">
				Sign out
			</button>
		</form>
	);
}
