const getLocalizedString = (
  localizedString: Record<string, string> | undefined,
  locale: string | undefined
) =>
  !localizedString || !locale
    ? undefined
    : locale in localizedString
    ? localizedString[locale]
    : Object.values(localizedString)[0]

export default getLocalizedString
