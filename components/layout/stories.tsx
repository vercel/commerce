import clsx from 'clsx';
import { format } from 'date-fns';
import { getBlog } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { SupportedLocale } from './navbar/language-control';

export default async function Stories({
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

  if (!blog) return null;

  return (
    <div className="px-6 py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col space-y-6">
        <h3 className="font-serif text-5xl">stories</h3>
        <div
          className={clsx(
            'font-multilingual font-extralight',
            'flex flex-col space-y-6 md:space-y-px'
          )}
        >
          {blog?.articles?.map((article) => (
            <Link href={`/stories/${article.handle}`}>
              <div className="flex flex-col space-y-2 bg-white text-black md:col-span-1 md:flex-row md:space-x-2 md:space-y-0">
                <div className="relative aspect-[4/3] min-w-full overflow-hidden md:min-w-[480px]">
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
                <div className="flex grow flex-col space-y-4 p-6 md:p-12">
                  <div className="text-sm">
                    {format(new Date(article?.publishedAt), 'yyyy-MM-dd')}
                  </div>
                  <div className="text-3xl">{article?.title}</div>
                  <div className="text-lg">{article?.excerpt}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {more && (
          <div className="flex w-full flex-row justify-center pt-12">
            <Link
              href="/stories"
              className="mx-auto max-w-sm border border-dark px-24 py-3 text-center text-lg transition-colors duration-150 hover:border-dark/40"
            >
              more stories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
