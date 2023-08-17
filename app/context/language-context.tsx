'use client';

import { Locale } from 'i18n-config';
import { ReactNode, createContext, useContext, useState } from 'react';

interface IContextProps {
  currentLocale?: Locale;
  currentLanguage?: Locale;
  setCurrentLanguage: (language: Locale) => void;
  currentDictionary?: any;
}

export const LanguageContext = createContext<IContextProps>({} as IContextProps);

export function LanguageProvider({
  locale,
  dictionary,
  children
}: {
  locale: Locale;
  dictionary?: any;
  children: ReactNode | ReactNode[] | string;
}) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale || 'en');
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(locale || 'en');
  const [currentDictionary] = useState<any | undefined>(dictionary);

  return (
    <LanguageContext.Provider
      value={{
        currentLocale,
        currentLanguage,
        setCurrentLanguage,
        currentDictionary
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  return useContext(LanguageContext);
};
