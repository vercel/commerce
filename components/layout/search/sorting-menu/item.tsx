import clsx from 'clsx';
import { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const SortingItem = ({ item, hover }: { item: SortFilterItem; hover: boolean }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;

  const newSearchParams = new URLSearchParams(searchParams);
  if (item.slug && item.slug.length) {
    newSearchParams.set('sort', item.slug);
  } else {
    newSearchParams.delete('sort');
  }

  const href = createUrl(pathname, newSearchParams);
  const DynamicTag = active ? 'p' : Link;

  return (
    <DynamicTag
      prefetch={!active ? false : undefined}
      href={href}
      className={clsx('block px-4 py-2 text-sm', {
        'font-medium text-gray-900': active,
        'text-gray-500': !active,
        'bg-gray-100': hover,
        'bg-transparent': !hover
      })}
    >
      {item.title}
    </DynamicTag>
  );
};

export default SortingItem;
