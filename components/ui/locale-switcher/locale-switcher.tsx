'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown/dropdown'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { i18n } from '../../../i18n-config'

interface LocaleSwitcherProps {
  currentLocale: string
}

export default function LocaleSwitcher({currentLocale}: LocaleSwitcherProps) {
  const pathName = usePathname()
  
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>

      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger asChild>
        <button
          className={
            'duration-200 bg-app shrink-0 flex items-center justify-center transition hover:scale-105'
          }
          aria-label="Language selector"
        >
          Locale: {currentLocale}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="drop-shadow-xl">
        <ul className="">
          {i18n.locales.map((locale) => {
            return (
              <DropdownMenuItem
                key={locale}
                asChild
              >
                <li key={locale}>
                  <Link href={redirectedPathName(locale)}>{locale}</Link>
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