import { SupportedLocale } from 'components/layout/navbar/language-control';
import 'server-only';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  ja: () => import('./ja.json').then((module) => module.default)
};

export const getDictionary = async (locale: SupportedLocale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
