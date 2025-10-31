'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { ViewTransition } from 'react';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  viewTransitionName,
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
  viewTransitionName?: string;
} & React.ComponentProps<typeof Image>) {
  const imageElement = (
    <Image
      className={clsx('relative h-full w-full object-contain', {
        'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
      })}
      {...props}
    />
  );

  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        viewTransitionName ? (
          <ViewTransition name={viewTransitionName}>{imageElement}</ViewTransition>
        ) : (
          imageElement
        )
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
