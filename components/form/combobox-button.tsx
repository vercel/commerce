import { ComboboxButtonProps, ComboboxButton as HeadlessComboboxButton } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

export default function ComboboxButton({ className, ...props }: ComboboxButtonProps) {
  return (
    <HeadlessComboboxButton
      className={clsx(
        'group absolute inset-y-0 right-0 px-2.5',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="fill-black/60 group-data-[hover]:fill-black size-5" />
    </HeadlessComboboxButton>
  );
}
