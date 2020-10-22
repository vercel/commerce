import useSignup from '@lib/bigcommerce/use-signup'
import { Layout } from '@components/core'
import { Logo, Modal, Button } from '@components/ui'

export default function Login() {
  const signup = useSignup()
  // TODO: use this method
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
    }
  }

  return (
    <div className="pb-20">
      <Modal close={() => {}}>
        <div className="h-80 w-80 flex flex-col justify-between py-3 px-3">
          <div className="flex justify-center pb-12 ">
            <Logo width="64px" height="64px" />
          </div>
          <div className="flex flex-col space-y-3">
            <div className="border border-accents-3 text-accents-6">
              <input
                placeholder="Email"
                className="focus:outline-none bg-primary focus:shadow-outline-gray border-none py-2 px-6 w-full appearance-none transition duration-150 ease-in-out placeholder-accents-5 pr-10"
              />
            </div>
            <div className="border border-accents-3 text-accents-6">
              <input
                placeholder="Password"
                className="bg-primary focus:outline-none focus:shadow-outline-gray border-none py-2 px-6 w-full appearance-none transition duration-150 ease-in-out placeholder-accents-5 pr-10"
              />
            </div>
            <Button variant="slim" onClick={handleSignup}>
              Log In
            </Button>
            <span className="pt-3 text-center text-sm">
              <span className="text-accents-7">Don't have an account?</span>
              {` `}
              <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </Modal>
    </div>
  )
}

Login.Layout = Layout
