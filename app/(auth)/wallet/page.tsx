'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function WalletLoginPage() {
  async function connectWallet() {
    const eth = (window as any).ethereum
    if (!eth) {
      alert('No wallet detected')
      return
    }
    const [address] = await eth.request({ method: 'eth_requestAccounts' })
    const domain = window.location.host
    const origin = window.location.origin
    const nonce = Math.random().toString(36).slice(2)
    const message = `Sign-In With Ethereum\n\nURI: ${origin}\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}\nResources:\n- ${origin}`
    const signature = await eth.request({ method: 'personal_sign', params: [message, address] })
    await signIn('siwe', { redirect: true, message, signature, callbackUrl: '/' })
  }

  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h2 className="text-2xl font-semibold text-brand-midnight">Wallet Login</h2>
      <p className="mt-2 text-brand-midnight/80">Sign in with your Ethereum wallet.</p>
      <div className="mt-6">
        <Button onClick={connectWallet} className="w-full">Connect Wallet</Button>
      </div>
    </div>
  )
}


