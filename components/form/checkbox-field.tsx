import { Checkbox, CheckboxProps, Field, Label } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';

type CheckboxFieldProps = CheckboxProps & {
  label: string;
  name: string;
};

const CheckboxField = ({ label, name, ...props }: CheckboxFieldProps) => {
  return (
    <Field className="flex items-center gap-2">
      <Checkbox
        name={name}
        className="group size-5 rounded bg-white p-1 ring-1 ring-inset ring-gray-300 data-[checked]:bg-primary data-[checked]:ring-primary"
        {...props}
      >
        {/* Checkmark icon */}
        <CheckIcon className="hidden size-3 fill-white group-data-[checked]:block" />
      </Checkbox>
      <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label>
    </Field>
  );
};

export default CheckboxField;
