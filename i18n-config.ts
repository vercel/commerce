export const i18n = {
  defaultLocale: 'sv',
  locales: [
    {
      id: 'sv',
      title: 'Swedish'
    }, 
    {
      id: 'en',
      title: 'English'
    }
  ],
} as const

export type Locale = typeof i18n['locales'][number]