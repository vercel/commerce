'use client';

import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import {
  Field,
  Input as HeadlessInput,
  InputProps as HeadlessInputProps,
  Label
} from '@headlessui/react';

import { focusInput, hasErrorInput } from 'lib/utils';

const inputStyles = tv({
  slots: {
    root: '',
    label: [
      // base
      'text-sm leading-none',
      // text color
      'text-content-strong font-medium',
      // disabled
      'data-[disabled]-text-gray-400'
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
    ]
  },
  variants: {
    hasError: {
      true: hasErrorInput
    }
  }
});

export interface InputProps extends HeadlessInputProps, VariantProps<typeof inputStyles> {
  label?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

function Input({
  className,
  label,
  labelClassName,
  inputClassName,
  hasError,
  disabled,
  ...props
}: InputProps) {
  const { root, label: labelStyles, input } = inputStyles({ hasError });
  return (
    <Field disabled={disabled} className={root({ className })}>
      {label && <Label className={labelStyles({ className: labelClassName })}>{label}</Label>}
      <HeadlessInput
        disabled={disabled}
        className={input({ className: inputClassName })}
        {...props}
      />
    </Field>
  );
}

export default Input;
