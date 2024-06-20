'use client';

import { cn } from 'lib/shopify/utils';
import { ITooltip, Tooltip as ReactTooltip } from 'react-tooltip';

const Tooltip = ({ id, children, className }: ITooltip) => {
  return (
    <ReactTooltip id={id} className={cn('z-10', className)}>
      {children}
    </ReactTooltip>
  );
};

export default Tooltip;
