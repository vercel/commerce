import { categoriesQuery } from '@/lib/sanity/queries';
import { clientFetch } from '@/lib/sanity/sanity.client';
import Link from 'next/link';

interface MainMenuProps {
  locale: string;
}

export default async function MainMenu({ locale }: MainMenuProps) {
  const params = {
    locale: locale
  };

  const categories = await clientFetch(categoriesQuery, params);

  if (!categories) {
    return;
  }

  return (
    <ul className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {categories.map((category: { slug: string } | any, index: number) => {
        return (
          <li className="font-medium" key={index}>
            <Link className="hover:underline" href={`/category/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
