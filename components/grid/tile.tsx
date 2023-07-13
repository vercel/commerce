import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  labelPosition,
  labels,
  hoverBorder,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  labelPosition?: 'bottom' | 'center';
  hoverBorder?: boolean;
  labels?: {
    title: string;
    amount: string;
    currencyCode: string;
    isSmall?: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-black',
        active !== undefined && active
          ? 'border-2 border-blue-600'
          : 'border-gray-200 dark:border-gray-800',
        hoverBorder && 'hover:border-blue-600',
        {
          relative: labels
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out hover:scale-105': isInteractive
          })}
          {...props}
          alt={props.title || ''}
        />
      ) : null}
      {labels ? (
        <Label
          title={labels.title}
          amount={labels.amount}
          currencyCode={labels.currencyCode}
          size={labels.isSmall ? 'small' : 'large'}
          position={labelPosition}
        />
      ) : null}
    </div>
  );
}
