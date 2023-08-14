'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface PreviewBannerProps {
  title?: string;
}

const PreviewBanner = ({ title }: PreviewBannerProps) => {
  const t = useTranslations('ui.previewBanner');
  return (
    <div className="fixed bottom-0 right-0 z-50 flex w-full items-center justify-between border-t border-high-contrast bg-app p-6">
      {title && (
        <p className="text-lg">
          {t('titlePart')} <span className="font-bold italic">{title}</span>
        </p>
      )}
      <Link
        className="bg-blue px-6 py-4 text-center font-bold text-white transition-colors duration-100 hover:bg-opacity-80 focus:bg-opacity-80"
        href="/api/exit-preview"
        prefetch={false}
      >
        {t('exitPreviewLabel')}
      </Link>
    </div>
  );
};

export default PreviewBanner;
