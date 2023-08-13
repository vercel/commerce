'use client';

import { Locale } from 'i18n-config';
import { ReactNode, createContext, useContext, useState } from 'react';

interface IContextProps {
  currentLanguage?: Locale;
  setCurrentLanguage: (language: Locale) => void;
}

export const LanguageContext = createContext<IContextProps>({} as IContextProps);

export function LanguageProvider({
  language,
  children
}: {
  language: Locale;
  children: ReactNode | ReactNode[] | string;
}) {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(language || 'en');

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  return useContext(LanguageContext);
};
