'use client';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import Spinner from 'components/spinner';
import get from 'lodash.get';
import { useCallback, useState } from 'react';

type FilterFieldProps<T extends { [key: string]: unknown }> = {
  options: T[];
  selectedValue: T | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: T | null) => void;
  label: string;
  displayKey?: string;
  // eslint-disable-next-line no-unused-vars
  getId: (option: T) => string;
  disabled?: boolean;
  autoFocus?: boolean;
  isLoading?: boolean;
};

const FilterField = <T extends { [key: string]: unknown }>({
  options,
  selectedValue,
  onChange,
  label,
  displayKey = 'name',
  getId,
  disabled,
  isLoading,
  autoFocus = false
}: FilterFieldProps<T>) => {
  const [query, setQuery] = useState('');
  const getDisplayValue = useCallback(
    (option: T | null) => {
      if (!option) return '';

      if (typeof option[displayKey] === 'string') {
        return option[displayKey] as string;
      }

      return get(option, `${displayKey}.value`) as string;
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
    <div className="w-full">
      <Combobox
        value={selectedValue}
        by={displayKey}
        onChange={onChange}
        onClose={() => setQuery('')}
        immediate
        disabled={disabled}
      >
        <div className="relative">
          <ComboboxInput
            aria-label={label}
            displayValue={getDisplayValue}
            placeholder={`Select ${label}`}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded border border-gray-200 py-1.5 pl-3 pr-8 text-sm ring-2 ring-transparent focus:outline-none focus-visible:outline-none data-[disabled]:cursor-not-allowed data-[autofocus]:border-0 data-[focus]:border-transparent data-[disabled]:opacity-50 data-[focus]:ring-2 data-[autofocus]:ring-secondary data-[focus]:ring-secondary data-[focus]:ring-offset-0"
            autoFocus={autoFocus}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50">
            {isLoading ? (
              <Spinner className="fill-black/60" />
            ) : (
              <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black" />
            )}
          </ComboboxButton>
        </div>
        <ComboboxOptions
          anchor="bottom"
          className="z-10 w-[var(--input-width)] rounded-xl border border-gray-200 bg-white p-1 [--anchor-gap:6px] empty:hidden"
        >
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={getId(option)}
              value={option}
              className="flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 text-sm/6 data-[focus]:bg-secondary/10"
            >
              {getDisplayValue(option)}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export default FilterField;
