'use client';
 
import LocaleSwitcher from 'components/ui/locale-switcher/locale-switcher';
import { useTranslations } from 'next-intl';

interface PageProps {
  params: {
    locale: string
  }
}
 
export default function Index({params: {locale}} : PageProps) {

  const t = useTranslations('Index');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <LocaleSwitcher currentLocale={locale} />
    </div>
  )
}