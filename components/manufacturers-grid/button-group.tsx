'use client';

import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { MAKE_FILTER_ID } from 'lib/constants';
import { Metaobject } from 'lib/shopify/types';
import { createUrl } from 'lib/shopify/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const ButtonGroup = ({ manufacturer }: { manufacturer: Metaobject }) => {
  const searchParams = useSearchParams();
  const _newSearchParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const handleClick = (type: 'engines' | 'transmissions') => {
    _newSearchParams.set(MAKE_FILTER_ID, manufacturer.id);

    router.push(createUrl(`/search/${type}`, _newSearchParams));
  };

  return (
    <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-0">
      <button
        className="flex items-center gap-1 rounded border border-primary px-1 py-0.5 text-xs text-primary"
        onClick={() => handleClick('engines')}
      >
        Engines <ArrowRightIcon className="size-3" />
      </button>
      <button
        className="flex items-center gap-1 rounded border border-transparent bg-primary/10 px-1 py-0.5 text-xs text-primary"
        onClick={() => handleClick('transmissions')}
      >
        Transmissions <ArrowRightIcon className="size-3" />
      </button>
    </div>
  );
};

export default ButtonGroup;
