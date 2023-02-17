import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'
import s from './Footer.module.css'
import navBarLinks from '../../../static_data/navBarLinks.json'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

interface FooterLink {
  label: string
  href: string
}

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  const { locale = 'it' } = useRouter()
  const links = navBarLinks[locale as keyof typeof navBarLinks]

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  <Logo />
                </span>
                <span>ACME</span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-6">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links].map((page: FooterLink) => (
                <span key={page.href} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.href!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.label}
                    </a>
                  </Link>
                </span>
              ))}
              {[...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-4 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-4 items-center h-10">
              <ThemeSwitcher />
              <I18nWidget />
              <a
                className={s.link}
                aria-label="Github Repository"
                href="https://github.com/DanielePancottini"
              >
                <Github />
              </a>
              <a
                className={s.link}
                aria-label="Email"
                href="mailto:safaraecommerce@protonmail.com"
              >
                <AtSignIcon />
              </a>
              <a
                className={s.link}
                aria-label="Phone"
                href="tel:+390123456789"
              >
                <PhoneIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
            <span className='ml-5'>&copy; 2023 Daniele Pancottini All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
