import { categoriesQuery } from '@/lib/sanity/queries';
import { clientFetch } from '@/lib/sanity/sanity.client';
import Link from 'next/link';

interface DesktopMenuProps {
  locale: string;
}

export default async function DesktopMenu({ locale }: DesktopMenuProps) {
  const params = {
    locale: locale
  };

  const categories = await clientFetch(categoriesQuery, params);

  if (!categories) {
    return;
  }

  return (
    <ul className="flex space-x-4 lg:space-x-6">
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
