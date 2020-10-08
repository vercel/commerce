import cn from 'classnames'
import { FC } from 'react'
import { Logo } from '@components/ui'
import Link from 'next/link'

interface Props {
  className?: string
  children?: any
}

const Footer: FC<Props> = ({ className }) => {
  const rootClassName = cn(
    'flex flex-col p-6 md:py-12 md:flex-row bg-black text-white flex-wrap',
    className
  )
  return (
    <footer className={rootClassName}>
      <Link href="/">
        <a className="flex flex-initial items-center md:items-start font-bold md:mr-24">
          <span className="rounded-full border border-gray-700 mr-2">
            <Logo />
          </span>
          <span>ACME</span>
        </a>
      </Link>

      <ul className="flex flex-initial flex-col divide-y divide-gray-700 md:divide-y-0 my-12 md:my-0 md:flex-1">
        <li className="py-3 md:py-0 md:pb-4">
          <Link href="/about">
            <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
              About
            </a>
          </Link>
        </li>

        <li className="py-3 md:py-0 md:pb-4">
          <Link href="/terms">
            <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
              Terms of Use
            </a>
          </Link>
        </li>

        <li className="py-3 md:py-0 md:pb-4">
          <Link href="/privacy">
            <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
              Privacy Policy
            </a>
          </Link>
        </li>
      </ul>

      <small className="text-base">
        &copy; 2020 ACME, Inc. All rights reserved.
      </small>

      <hr
        className="hidden md:block mt-4 border-gray-700"
        style={{ flexBasis: '100%', height: 0 }}
      />
    </footer>
  )
}

export default Footer
