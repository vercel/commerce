'use client';

import {
  Combobox as HeadlessCombobox,
  ComboboxProps as HeadlessComboboxProps,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label
} from '@headlessui/react';
import { AnchorProps } from '@headlessui/react/dist/internal/floating';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { focusInput } from 'lib/utils';
import get from 'lodash.get';
import { useCallback, useState } from 'react';
import { tv } from 'tailwind-variants';

const combobox = tv({
  slots: {
    root: '',
    label: [
      'text-sm leading-none',
      'text-content-strong font-medium',
      'data-[disabled]:text-gray-400'
    ],
    input: [
      // base
      'w-full relative block rounded-md border-0 shadow-sm outline-none transition sm:text-sm sm:leading-6',
      'mt-2 px-2.5 py-1.5',
      // border color
      'border-gray-300',
      // text color
      'text-gray-900',
      // ring
      'ring-1 ring-inset ring-gray-300',
      // placeholder color
      'placeholder-gray-400',
      // background color
      'bg-white',
      // disabled
      'data-[disabled]:border-gray-300 data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400',
      // focus
      focusInput,
      // invalid
      'data-[invalid]:ring-2 data-[invalid]:ring-red-200 data-[invalid]:border-red-500'
    ],
    button: [
      'group absolute inset-y-0 right-0 px-2.5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
    ],
    options: [
      'z-10 w-[var(--input-width)] rounded-xl border border-gray-200 bg-white p-1 [--anchor-gap:6px] empty:hidden'
    ],
    option: [
      'flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 text-sm/6 data-[focus]:bg-secondary/10'
    ]
  }
});

interface ComboboxProps<T extends Record<string, unknown>, TMultiple extends boolean | undefined>
  extends HeadlessComboboxProps<T, TMultiple> {
  options: T[];
  label: string;
  labelHidden?: boolean;
  autoFocus?: boolean;
  displayKey: keyof T;
  required?: boolean;
  className?: string;
  anchor?: AnchorProps;
}

const Combobox = <T extends Record<string, unknown>, TMultiple extends boolean | undefined>({
  options,
  value,
  onChange,
  label,
  labelHidden,
  displayKey,
  disabled,
  autoFocus,
  by,
  className,
  required,
  anchor,
  ...props
}: ComboboxProps<T, TMultiple>) => {
  const {
    root,
    label: labelStyles,
    input,
    button,
    options: optionsStyles,
    option: optionStyles
  } = combobox();

  const [query, setQuery] = useState('');
  const getDisplayValue = useCallback(
    (option: T | null) => {
      if (!option) return '';

      if (typeof option[displayKey] === 'string') {
        return option[displayKey] as string;
      }

      return get(option, `${displayKey as string}.value`) as string;
    },
    [displayKey]
  );

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return getDisplayValue(option).toLocaleLowerCase().includes(query.toLowerCase());
        });

  return (
    <Field disabled={disabled} className={root({ className })}>
      {!labelHidden && (
        <Label className={labelStyles()}>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
      )}
      <HeadlessCombobox
        value={value}
        onChange={onChange}
        onClose={() => setQuery('')}
        disabled={disabled}
        by={by}
        {...props}
      >
        <div className="relative">
          <ComboboxInput
            aria-label={label}
            displayValue={getDisplayValue}
            placeholder={`Select ${label}`}
            onChange={(event) => setQuery(event.target.value)}
            className={input()}
            autoFocus={autoFocus}
          />
          <ComboboxButton className={button()}>
            <ChevronDownIcon className="fill-black/60 group-data-[hover]:fill-black size-5" />
          </ComboboxButton>
        </div>
        <ComboboxOptions anchor="bottom" className={optionsStyles()}>
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={option[by as keyof T] as string}
              value={option}
              className={optionStyles()}
            >
              {getDisplayValue(option)}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </HeadlessCombobox>
    </Field>
  );
};

export default Combobox;
