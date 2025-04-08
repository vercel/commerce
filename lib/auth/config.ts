import { wordpress } from 'lib/wordpress/wordpress';
import { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' // Use JWT for session handling
  },
  providers: [
    CredentialsProvider({
      name: 'woocommerce',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const user = await wordpress.login(credentials.username, credentials.password);
        // If no error and we have user data, return it
        if (user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        console.debug('Set token user', user);
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.debug('Set session token', token.user);
      session.user = token.user;
      return session;
    }
  }
} satisfies NextAuthOptions;
