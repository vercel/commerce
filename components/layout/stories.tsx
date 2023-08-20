import clsx from 'clsx';
import { getBlog } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { SupportedLocale } from './navbar/language-control';

export default async function Stories({
  locale,
  handle,
  articles
}: {
  locale?: SupportedLocale;
  handle: string;
  articles?: number;
}) {
  const blog = await getBlog({
    handle: 'headless',
    articles: articles || 3,
    language: locale?.toUpperCase()
  });
  console.debug({ blog });

  if (!blog) return null;

  return (
    <div className="bg-white px-6 text-black md:py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col space-y-6">
        <h3 className="font-serif text-5xl">stories</h3>
        <div
          className={clsx(
            'font-multilingual',
            'font-extralight',
            'flex flex-col space-x-6 space-y-6 md:flex-row md:space-y-0'
          )}
        >
          {blog?.articles?.map((article) => (
            <div className="flex flex-col space-y-4 md:w-1/3">
              <div className="relative aspect-square max-w-sm overflow-hidden">
                {!!article?.image?.url && (
                  <Image
                    src={article?.image?.url}
                    width={article?.image?.width}
                    height={article?.image?.height}
                    alt={article?.image?.altText || `image-for-${article?.handle}`}
                    className={clsx(
                      'h-full w-full object-cover',
                      'transition duration-300 ease-in-out hover:scale-105'
                    )}
                  />
                )}
              </div>
              <div className="max-w-sm text-lg">{article?.title}</div>
              <div className="max-w-sm">{article?.excerpt}</div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row justify-center pt-12">
          <Link
            href="/stories"
            className="mx-auto max-w-sm border border-dark px-24 py-3 text-center text-lg transition-colors duration-150 hover:border-dark/40"
          >
            more stories
          </Link>
        </div>
      </div>
    </div>
  );
}
