import clsx from 'clsx';
import { getBlog } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { SupportedLocale } from './navbar/language-control';

export default async function StoriesPreview({
  locale,
  handle,
  articles,
  more = false
}: {
  locale?: SupportedLocale;
  handle: string;
  articles?: number;
  more?: boolean;
}) {
  const blog = await getBlog({
    handle: handle,
    articles: articles || 250,
    language: locale?.toUpperCase()
  });

  if (!blog || !!blog?.articles) return null;

  return (
    <div className="bg-white px-6 py-24 text-black">
      <div className="mx-auto flex max-w-screen-xl flex-col space-y-6">
        <h3 className="font-serif text-5xl">stories</h3>
        <div
          className={clsx(
            'font-multilingual font-extralight',
            'grid grid-cols-1 gap-y-24 md:grid-cols-3 md:gap-x-4'
          )}
        >
          {blog?.articles?.map((article, index) => (
            <Link href={`/stories/${article.handle}`} key={`${article.handle}-${index}`}>
              <div className="flex flex-col space-y-4 md:col-span-1">
                <div className="relative aspect-square overflow-hidden md:max-w-sm">
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
            </Link>
          ))}
        </div>
        {more && (
          <div className="flex w-full flex-row justify-center pt-12">
            <Link
              href="/stories"
              className="mx-auto max-w-sm border border-dark px-24 py-3 text-center text-[15px] transition-colors duration-150 hover:border-dark/40"
            >
              more stories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
