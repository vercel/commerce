import { NextRequest, NextResponse } from 'next/server';
import isAuthenticated from './lib/is-authenticated';

export const config = {
	matcher: ['/checkout', '/account', '/account/:path*'],
};

export function middleware(request: NextRequest) {
	const isLoginPage = request.nextUrl.pathname === '/account/login';
	const isRecoverPasswordPage =
		request.nextUrl.pathname.startsWith('/account/recover');
	const isResetPasswordPage =
		request.nextUrl.pathname.startsWith('/account/reset');
	const isRegisterPage = request.nextUrl.pathname === '/account/register';

	const authPages =
		isLoginPage ||
		isRecoverPasswordPage ||
		isRegisterPage ||
		isResetPasswordPage;

	if (authPages && isAuthenticated(request)) {
		return NextResponse.redirect(new URL('/account', request.url));
	}

	if (!authPages && !isAuthenticated(request)) {
		return NextResponse.redirect(new URL('/account/login', request.url));
	}
}
