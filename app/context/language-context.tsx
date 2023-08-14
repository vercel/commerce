'use client';

import { Locale } from 'i18n-config';
import { ReactNode, createContext, useContext, useState } from 'react';

interface IContextProps {
  currentLanguage?: Locale;
  setCurrentLanguage: (language: Locale) => void;
  currentDictionary?: any;
}

export const LanguageContext = createContext<IContextProps>({} as IContextProps);

export function LanguageProvider({
  language,
  dictionary,
  children
}: {
  language: Locale;
  dictionary?: any;
  children: ReactNode | ReactNode[] | string;
}) {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(language || 'en');
  const [currentDictionary] = useState<any | undefined>(dictionary);

  return (
    <LanguageContext.Provider
      value={{
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
