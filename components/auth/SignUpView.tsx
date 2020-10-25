import { FC, useEffect, useState } from 'react'
import { Logo, Button, Input } from '@components/ui'
import useSignup from '@lib/bigcommerce/use-signup'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'

interface Props {}

interface Error {
  code: string
  message: string
}

const LoginView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const signup = useSignup()
  const { setModalView, closeModal } = useUI()

  const handleSignup = async () => {
    try {
      setLoading(true)
      setMessage('')
      await signup({
        email,
        firstName,
        lastName,
        password,
      })
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  useEffect(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    setDisabled(!validate(email) || password.length < 7 || !validPassword)
  }, [email, password])

  return (
    <div className="w-80 flex flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}
        <Input placeholder="First Name" onChange={setFirstName} />
        <Input placeholder="Last Name" onChange={setLastName} />
        <Input placeholder="Email" onChange={setEmail} />
        <Input placeholder="Password" onChange={setPassword} />
        <Button
          variant="slim"
          onClick={() => handleSignup()}
          loading={loading}
          disabled={disabled}
        >
          Sign Up
        </Button>
        <span className="pt-3 text-center text-sm">
          <span className="text-accents-7">Do you have an account?</span>
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
