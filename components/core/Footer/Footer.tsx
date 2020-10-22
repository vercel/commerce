import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Page } from '@lib/bigcommerce/api/operations/get-all-pages'
import getSlug from '@utils/get-slug'
import { Logo } from '@components/ui'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const rootClassName = cn(
    'flex flex-col p-6 md:py-12 md:flex-row flex-wrap max-w-screen-xl m-auto',
    className
  )
  const { sitePages, legalPages } = getPages(pages)

  return (
    <div className="bg-black text-white">
      <footer className={rootClassName}>
        <div className="grid grid-col-12"></div>
        <div>
          <Link href="/">
            <a className="flex flex-initial items-center  font-bold md:mr-24">
              <span className="rounded-full border border-gray-700 mr-2">
                <Logo />
              </span>
              <span>ACME</span>
            </a>
          </Link>
        </div>

        <ul className="flex flex-initial flex-col divide-y divide-gray-700 md:divide-y-0 my-12 md:my-0 md:flex-1">
          <li className="py-3 md:py-0 md:pb-4">
            <Link href="/">
              <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
                Home
              </a>
            </Link>
          </li>
          <li className="py-3 md:py-0 md:pb-4">
            <Link href="/">
              <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
                Careers
              </a>
            </Link>
          </li>
          <li className="py-3 md:py-0 md:pb-4">
            <Link href="/blog">
              <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
                Blog
              </a>
            </Link>
          </li>
          {sitePages.map((page) => (
            <li key={page.url} className="py-3 md:py-0 md:pb-4">
              <Link href={page.url!}>
                <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
                  {page.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-initial flex-col divide-y divide-gray-700 md:divide-y-0 my-12 md:my-0 md:flex-1">
          {legalPages.map((page) => (
            <li key={page.url} className="py-3 md:py-0 md:pb-4">
              <Link href={page.url!}>
                <a className="text-gray-400 hover:text-white transition ease-in-out duration-100">
                  {page.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <small className="text-white">
            &copy; 2020 ACME, Inc. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  )
}

function getPages(pages?: Page[]) {
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      if (page.url) {
        if (LEGAL_PAGES.includes(getSlug(page.url))) {
          legalPages.push(page)
        } else {
          sitePages.push(page)
        }
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
