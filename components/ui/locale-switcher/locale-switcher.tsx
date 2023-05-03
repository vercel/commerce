'use client'

import FlagEn from 'components/icons/flag-en';
import FlagSv from 'components/icons/flag-sv';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown/dropdown';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { i18n } from '../../../i18n-config';

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const handleClick = (e: any, locale: string) => {
    e.preventDefault()

    const parent = e.target

    if (parent.nodeName !== 'LI') {
      return
    }

    let href = '/'

    const hasChildLink = parent.querySelector('a').href !== null

    if (hasChildLink) {
      href = parent.querySelector('a').href
    }

    router.push(`${redirectedPathName(locale)}`)

    setIsOpen(false)
  }

  return (
    <div>

      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger asChild>
        <button
          className={
            'duration-200 bg-app shrink-0 uppercase space-x-2 text-sm flex items-center justify-center transition hover:scale-105'
          }
          aria-label="Language selector"
        >
          {locale === "sv" && (
            <FlagSv />
          )}
          {locale === "en" && (
            <FlagEn />
          )}
          <span>{locale}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="drop-shadow-xl">
        <ul className="">
          {i18n.locales.map((locale) => {
            let FlagIcon: any

            FlagIcon = i18n.flags[locale]

            return (
              <DropdownMenuItem
                className='p-0'
                key={locale}
                asChild
                onClick={(e) => handleClick(e, locale)}
              >
                <li className="flex" key={locale}>
                  <Link 
                    className="flex w-full cursor-pointer uppercase space-x-2 text-sm p-2"
                    onClick={() => setIsOpen(false)}
                    href={redirectedPathName(locale)}
                  >
                    <FlagIcon />
                    <span>{locale}</span>
                  </Link>
                </li>
              </DropdownMenuItem>
            )
          })}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  )
}