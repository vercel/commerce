import { FC, useEffect, useState } from 'react'
import { Logo, Modal, Button, Input } from '@components/ui'
import useSignup from '@lib/bigcommerce/use-signup'
import useLogin from '@lib/bigcommerce/use-login'
import { useUI } from '@components/ui/context'

interface Props {}

const LoginView: FC<Props> = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const signup = useSignup()
  const login = useLogin()
  const { setModalView } = useUI()
  // // Data about the currently logged in customer, it will update
  // // automatically after a signup/login/logout
  // const { data } = useCustomer()
  // TODO: use this method. It can take more than 5 seconds to do a signup
  const handleSignup = async () => {
    // TODO: validate the password and email before calling the signup
    // Passwords must be at least 7 characters and contain both alphabetic
    // and numeric characters.
    try {
      await signup({
        // This account already exists, so it will throw the "duplicated_email" error
        email: 'luis@vercel.com',
        firstName: 'Luis',
        lastName: 'Alvarez',
        password: 'luis123',
      })
    } catch (error) {
      if (error.code === 'duplicated_email') {
        // TODO: handle duplicated email
      }
      // Show a generic error saying that something bad happened, try again later
    }
  }

  const handleLogin = async () => {
    // TODO: validate the password and email before calling the signup
    // Passwords must be at least 7 characters and contain both alphabetic
    // and numeric characters.
    try {
      await login({
        email: 'luis@vercel.com',
        // This is an invalid password so it will throw the "invalid_credentials" error
        password: 'luis1234', // will work with `luis123`
      })
    } catch (error) {
      if (error.code === 'invalid_credentials') {
        // The email and password didn't match an existing account
      }
      // Show a generic error saying that something bad happened, try again later
    }
  }

  return (
    <div className="h-80 w-80 flex flex-col justify-between py-3 px-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        <div className="border border-accents-3 text-accents-6">
          <Input placeholder="Email" onChange={setEmail} />
        </div>
        <div className="border border-accents-3 text-accents-6">
          <Input placeholder="Password" onChange={setEmail} />
        </div>
        <Button variant="slim" onClick={handleSignup}>
          Sign Up
        </Button>
        <span className="pt-3 text-center text-sm">
          <span className="text-accents-7">Don't have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            Log In
          </a>
        </span>
      </div>
    </div>
  )
}

export default LoginView
