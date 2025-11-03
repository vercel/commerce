import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { SiweMessage } from 'siwe'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.passwordHash) return null
        const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!valid) return null
        return { id: user.id, name: user.name, email: user.email, role: user.role, walletAddress: user.walletAddress || undefined } as any
      }
    }),
    Credentials({
      id: 'siwe',
      name: 'SIWE',
      credentials: {
        message: { label: 'Message', type: 'text' },
        signature: { label: 'Signature', type: 'text' }
      },
      async authorize(credentials, req) {
        try {
          const message = credentials?.message
          const signature = credentials?.signature
          if (!message || !signature) return null
          const siwe = new SiweMessage(message)
          const result = await siwe.verify({ signature, domain: req?.headers?.get('host') || '', nonce: siwe.nonce })
          if (!result.success) return null
          const address = siwe.address.toLowerCase()
          // Upsert user by wallet
          let user = await prisma.user.findFirst({ where: { walletAddress: address } })
          if (!user) {
            user = await prisma.user.create({ data: { name: address.slice(0, 10), email: `${address}@wallet.local`, passwordHash: '', role: 'buyer', walletAddress: address } })
          }
          return { id: user.id, name: user.name, email: user.email, role: user.role, walletAddress: user.walletAddress || undefined } as any
        } catch {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error custom
        token.role = (user as any).role
        // @ts-expect-error custom
        token.walletAddress = (user as any).walletAddress
        token.sub = (user as any).id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error custom
        session.user.id = token.sub
        // @ts-expect-error custom
        session.user.role = (token as any).role
        // @ts-expect-error custom
        session.user.walletAddress = (token as any).walletAddress
      }
      return session
    }
  },
  pages: {
    signIn: '/(auth)/login'
  }
}

export const { auth } = NextAuth(authOptions)


