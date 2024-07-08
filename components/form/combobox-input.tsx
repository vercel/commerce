import { ComboboxInputProps } from '@headlessui/react';
import clsx from 'clsx';

export default function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  return (
    <ComboboxInput
      className={clsx(
        'w-full rounded border border-gray-200',
        'py-1.5 pl-3 pr-8 text-sm',
        'ring-2 ring-transparent',
        'focus:outline-none focus-visible:outline-none',
        'data-[disabled]:cursor-not-allowed data-[autofocus]:border-0',
        'data-[focus]:border-transparent data-[disabled]:opacity-50',
        'data-[focus]:ring-2 data-[autofocus]:ring-secondary',
        'data-[focus]:ring-secondary data-[focus]:ring-offset-0',
        className
      )}
      {...props}
    />
  );
}
