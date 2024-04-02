import clsx from 'clsx';
import Image from 'next/image';
import LabelOverlay from '../labelOverlay';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  sparkles,
  available,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  sparkles?: boolean;
  available?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-visible rounded-lg dark:bg-black',
        {
          relative: label,
          '': active,
          '': !active
        }
      )}
    >
      {sparkles && (
        <Image
          className={clsx(
            'absolute z-0 h-full w-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'
          )}
          src={'/okay_frame.svg'}
          width={420}
          height={420}
          alt={'branded frame'}
        />
      )}
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx(
            'relative z-10 h-full w-full object-contain',
            {
              'transition duration-300 ease-in-out group-hover:opacity-40': isInteractive
            },
            { '': !available }
          )}
          {...props}
        />
      ) : null}
      {label ? (
        <div className={clsx('opacity-0 transition group-hover:opacity-100')}>
          <LabelOverlay
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
            available={available}
          />
        </div>
      ) : null}
    </div>
  );
}
