'use client';
 
import LocaleSwitcher from 'components/ui/locale-switcher';
import { useTranslations } from 'next-intl';
 
export default function Index() {
  const t = useTranslations('Index');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <LocaleSwitcher />
    </div>
  )
}