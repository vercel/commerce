import { ComboboxOption as HeadlessCombobox, ComboboxOptionProps } from '@headlessui/react';
import clsx from 'clsx';

export default function ComboboxOption({ className, ...props }: ComboboxOptionProps) {
  return (
    <HeadlessCombobox
      className={clsx(
        'flex cursor-default select-none items-center gap-2',
        'rounded-lg px-3 py-1.5 text-sm/6',
        'data-[focus]:bg-secondary/10',
        className
      )}
      {...props}
    />
  );
}
