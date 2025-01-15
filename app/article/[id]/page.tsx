import Prose from 'components/prose';
import { wordpress } from 'lib/wordpress/wordpress';
import { notFound } from 'next/navigation';

export default async function ArticlePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const article = await wordpress.get(`posts/${id}`);
  if (!article) return notFound();

  return (
    <section className="mt-4 grid max-w-screen-2xl gap-4 px-4 pb-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
        <div className="flex flex-col">
          <h1 className="font-bold">{article.title.rendered}</h1>
          <Prose html={article.content.rendered} />
        </div>
      </div>
    </section>
  );
}
