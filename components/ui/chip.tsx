import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { VariantProps, tv } from 'tailwind-variants';

const chip = tv({
  slots: {
    root: 'inline-flex items-center gap-x-2 rounded-md px-2.5 py-2 text-sm font-medium ring-1 ring-inset',
    leadingIcon: 'h-5 w-5'
  },
  variants: {
    level: {
      success: {
        root: 'bg-green-50 text-green-700 ring-green-600/20'
      },
      warn: {
        root: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
      },
      info: {
        root: 'bg-content/5 text-content-emphasis ring-content/20'
      },
      error: {
        root: 'bg-red-50 text-red-700 ring-red-600/20'
      }
    }
  }
});

export interface LevelLeadingProps extends VariantProps<typeof chip> {
  className?: string;
}

export interface ChipProps extends VariantProps<typeof chip> {
  children: React.ReactNode;
  className?: string;
}

function LevelLeadingIcon({ level, className }: LevelLeadingProps) {
  if (level === 'success') {
    return <CheckCircleIcon className={clsx(className, 'text-green-500')} aria-hidden="true" />;
  }

  if (level === 'warn') {
    return (
      <ExclamationCircleIcon className={clsx(className, 'text-yellow-500')} aria-hidden="true" />
    );
  }

  if (level === 'error') {
    return <XCircleIcon className={clsx(className, 'text-red-500')} aria-hidden="true" />;
  }

  return null;
}

export default function Chip({ children, level, className }: ChipProps) {
  const { root, leadingIcon } = chip();
  return (
    <span className={root({ level, className })}>
      <LevelLeadingIcon level={level} className={leadingIcon()} />
      {children}
    </span>
  );
}
