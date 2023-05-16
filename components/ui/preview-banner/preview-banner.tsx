'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface PreviewBannerProps {
  title?: string
}

const PreviewBanner = ({ title }: PreviewBannerProps) => {
  const t = useTranslations('ui.previewBanner')
  return (
    <div className="flex justify-between items-center bg-app border-t border-high-contrast w-full fixed bottom-0 right-0 p-6 z-50">
      {title && (
        <p className="text-lg">
          {t('titlePart')} <span className="italic font-bold">{title}</span>
        </p>
      )}
      <Link
        className="bg-blue transition-colors duration-100 text-center px-6 py-4 text-white font-bold hover:bg-opacity-80 focus:bg-opacity-80"
        href="/api/exit-draft"
      >
        {t('exitPreviewLabel')}
      </Link>
    </div>
  )
}

export default PreviewBanner