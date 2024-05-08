import { PhotoIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  active,
  label,
  ...props
}: {
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="group">
      <div
        className={clsx(
          'aspect-h-1 aspect-w-1 relative overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75',
          {
            'border-2 border-secondary': active,
            'border-neutral-200': !active
          }
        )}
      >
        {props.src ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
          <Image className={clsx('h-full w-full object-cover object-center')} {...props} />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-gray-400"
            title="Missing product image"
          >
            <PhotoIcon className="size-7" />
          </div>
        )}
      </div>
      {label ? (
        <Label title={label.title} amount={label.amount} currencyCode={label.currencyCode} />
      ) : null}
    </div>
  );
}
