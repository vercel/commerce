import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx, focusInput, hasErrorInput } from 'lib/utils';

const inputStyles = tv({
  base: [
    // base
    'relative block w-full appearance-none rounded-md border px-2.5 py-1.5 shadow-sm outline-none transition sm:text-sm',
    // border color
    'border-gray-300 dark:border-gray-800',
    // text color
    'text-gray-900 dark:text-gray-50',
    // placeholder color
    'placeholder-gray-400 dark:placeholder-gray-500',
    // background color
    'bg-white dark:bg-gray-950',
    // disabled
    'disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400',
    'disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500',
    // file
    [
      'file:-my-1.5 file:-ml-2.5 file:h-[36px] file:cursor-pointer file:rounded-l-md file:rounded-r-none file:border-0 file:px-3 file:py-1.5 file:outline-none focus:outline-none disabled:pointer-events-none file:disabled:pointer-events-none',
      'file:border-solid file:border-gray-300 file:bg-gray-50 file:text-gray-500 file:hover:bg-gray-100 file:dark:border-gray-800 file:dark:bg-gray-950 file:hover:dark:bg-gray-900/20 file:disabled:dark:border-gray-700',
      'file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]',
      'file:disabled:bg-gray-100 file:disabled:text-gray-500 file:disabled:dark:bg-gray-800'
    ],
    // focus
    focusInput,
    // invalid
    'aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500'
  ],
  variants: {
    hasError: {
      true: hasErrorInput
    },
    // number input
    enableStepper: {
      true: '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
    }
  }
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, inputClassName, hasError, enableStepper, type, ...props }: InputProps,
    forwardedRef
  ) => {
    return (
      <div className={cx('relative w-full', className)}>
        <input
          ref={forwardedRef}
          type={type}
          className={cx(inputStyles({ hasError, enableStepper }), inputClassName)}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
