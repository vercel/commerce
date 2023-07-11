import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  labelPosition,
  labels,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  labelPosition?: 'bottom' | 'center';
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
        'relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-black',
        {
          relative: labels
        }
      )}
    >
      {active !== undefined && active ? (
        <span className="absolute w-full h-full bg-white opacity-25"></span>
      ) : null}
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
          size="large"
          position={labelPosition}
        />
      ) : null}
    </div>
  );
}
