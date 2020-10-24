import { Layout } from '@components/core'
import { Logo, Modal, Button } from '@components/ui'
export default function ForgotPassword() {
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
            <Button variant="slim">Recover Password</Button>
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

ForgotPassword.Layout = Layout
