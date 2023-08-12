import SanityImage from 'components/ui/sanity-image';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { FC } from 'react';
interface Props {
  className?: string;
  category: any;
}

const CategoryCard: FC<Props> = ({ category, className }) => {
  const rootClassName = cn(
    'w-1/2 min-w-0 grow-0 shrink-0 group relative box-border overflow-hidden transition-transform ease-linear cursor-pointer basis-[50%]',
    className
  );

  return (
    <Link href={`${category.slug}`} className={rootClassName} aria-label={category.name}>
      <div className={'flex h-full w-full flex-1 flex-col justify-center'}>
        <div className="relative aspect-[3/4] h-full w-full">
          <SanityImage
            image={category.image}
            alt={category.name || 'Category Image'}
            width={300}
            height={400}
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-high-contrast px-6 py-3 font-medium text-white md:px-10 md:py-5">
            {category.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
