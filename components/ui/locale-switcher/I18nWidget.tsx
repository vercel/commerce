import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/Dropdown/Dropdown'

interface LOCALE_DATA {
  name: string
  img: {
    filename: string
    alt: string
  }
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  sv: {
    name: 'Swedish',
    img: {
      filename: 'flag-sv.svg',
      alt: 'Swedish flag',
    },
  },
  nn: {
    name: 'Norwegian',
    img: {
      filename: 'flag-no.svg',
      alt: 'Norwegian flag',
    },
  },
  en: {
    name: 'English',
    img: {
      filename: 'flag-en.svg',
      alt: 'British flag',
    },
  },
}

interface I18nWidgetProps {
  translations: [] | any
}

const I18nWidget = ({ translations }: I18nWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, locales, defaultLocale = 'sv' } = useRouter()
  const router = useRouter()

  const options: any = locales?.filter((val) => val !== locale)
  const currentLocale = locale || defaultLocale

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

    router.push({ pathname: href }, { pathname: href }, { locale: locale })

    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger asChild>
        <button
          className={
            'w-10 h-10 duration-200 bg-app shrink-0 flex items-center justify-center transition hover:scale-105'
          }
          aria-label="Language selector"
        >
          <Image
            width="13"
            height="18"
            className="flex w-5 h-auto pointer-events-none rounded-[1px]"
            src={`/${LOCALES_MAP[currentLocale].img.filename}`}
            alt={LOCALES_MAP[currentLocale].img.alt}
            unoptimized
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="drop-shadow-xl">
        <ul className="">
          {options.map((locale: any) => {
            const translationLink = translations?.find(
              (item: object | any) => item.locale === locale
            )

            return (
              <DropdownMenuItem
                key={locale}
                asChild
                onClick={(e) => handleClick(e, locale)}
              >
                <li>
                  <Link
                    href={translationLink ? translationLink.slug.current : '/'}
                    locale={locale}
                    className={cn(
                      'flex items-center w-full cursor-pointer px-1 py-1 text-center transition ease-in-out duration-150 text-high-contrast capitalize'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>
                      <Image
                        width="13"
                        height="18"
                        className="mr-2 w-5 h-auto pointer-events-none rounded-[1px]"
                        src={`/${LOCALES_MAP[locale].img.filename}`}
                        alt={LOCALES_MAP[locale].img.alt}
                      />
                    </span>
                    <span>{LOCALES_MAP[locale].name}</span>
                  </Link>
                </li>
              </DropdownMenuItem>
            )
          })}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default I18nWidget
