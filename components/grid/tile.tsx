import clsx from 'clsx';
import Image from 'next/image';

export function GridTileImage({
  isInteractive = true,
  active: _active,
  label: _label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <>
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('h-full w-full object-cover', {
            'transition duration-300 ease-in-out hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
    </>
  );
}
