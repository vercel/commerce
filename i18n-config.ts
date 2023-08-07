export const supportedLanguages = {
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

export type Locale = typeof supportedLanguages['locales'][number]