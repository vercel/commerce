import FlagEn from "components/icons/flag-en"
import FlagSv from "components/icons/flag-sv"

export const i18n = {
  defaultLocale: 'sv',
  locales: ['sv', 'en'],
  flags: {
    sv: FlagSv,
    en: FlagEn
  }
} as const

export type Locale = typeof i18n['locales'][number]