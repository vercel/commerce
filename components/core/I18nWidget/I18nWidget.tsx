import { FC } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { DoubleChevron } from '@components/icon'
import s from './I18nWidget.module.css'

const LOCALES_MAP: Record<string, string> = {
  es: 'Español',
  'en-US': 'English',
}

const I18nWidget: FC = () => {
  const { locale, locales, defaultLocale = 'en-US' } = useRouter()
  const options = locales?.filter((val) => val !== locale)

  return (
    <nav className={s.root}>
      <Menu>
        <Menu.Button className={s.button} aria-label="Language selector">
          <img className="" src="/flag-us.png" alt="US Flag" />
          <span>{LOCALES_MAP[locale || defaultLocale]}</span>
          {options && (
            <span className="">
              <DoubleChevron />
            </span>
          )}
        </Menu.Button>

        {options?.length ? (
          <Menu.Items className={s.dropdownMenu}>
            {options.map((locale) => (
              <Menu.Item key={locale}>
                {({ active }) => (
                  <Link href="/" locale={locale}>
                    <a className={cn(s.item, { [s.active]: active })}>
                      {LOCALES_MAP[locale]}
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        ) : null}
      </Menu>
    </nav>
  )
}

export default I18nWidget
