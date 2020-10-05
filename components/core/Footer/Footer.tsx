import cn from 'classnames'
import { FC } from 'react'
import s from './Footer.module.css'
import { Container, Logo } from '@components/ui'

interface Props {
  className?: string
  children?: any
}

const Footer: FC<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <footer className={rootClassName}>
      <Container className={s.container}>
        <div className="my-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2 py-6">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="">
              <div className="flex flex-row space-x-4 items-center">
                <span className="rounded-full border border-gray-300">
                  <Logo />
                </span>
                <span>ACME</span>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-300 hover:text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-300 hover:text-white"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base leading-6 text-gray-300 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end mt-12 md:mt-0">
            &copy; 2020 ACME, Inc. All rights reserved.
          </div>
        </div>
        <hr className="text-base leading-6 text-gray-400 xl:text-center border-t border-gray-700" />
      </Container>
    </footer>
  )
}

export default Footer
