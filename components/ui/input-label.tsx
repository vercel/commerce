import React from 'react';
import * as LabelPrimitives from '@radix-ui/react-label';

import { cx } from 'lib/utils';

export interface InputLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> {
  disabled?: boolean;
}

const InputLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitives.Root>, InputLabelProps>(
  ({ className, disabled, ...props }, forwardedRef) => (
    <LabelPrimitives.Root
      ref={forwardedRef}
      className={cx(
        // base
        'text-sm leading-none',
        // text color
        'text-gray-900 dark:text-gray-50',
        // disabled
        {
          'text-gray-400 dark:text-gray-600': disabled
        },
        className
      )}
      aria-disabled={disabled}
      {...props}
    />
  )
);
InputLabel.displayName = 'InputLabel';

export default InputLabel;
