import {
  ComboboxOptionsProps,
  ComboboxOptions as HeadlessComboboxOptions
} from '@headlessui/react';
import clsx from 'clsx';

export default function ComboboxOption({ className, ...props }: ComboboxOptionsProps) {
  return (
    <HeadlessComboboxOptions
      className={clsx(
        'z-10 w-[var(--input-width)] rounded-xl',
        'border border-gray-200 bg-white p-1 [--anchor-gap:6px] empty:hidden',
        className
      )}
      {...props}
    />
  );
}
