import { Field, Input as HeadlessInput, Label } from '@headlessui/react';
import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = ({ label, ...props }: InputProps) => {
  return (
    <Field>
      <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label>
      <HeadlessInput
        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/70 sm:text-sm sm:leading-6"
        {...props}
      />
    </Field>
  );
};

export default Input;
