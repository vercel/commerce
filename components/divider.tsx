import { tv } from 'tailwind-variants';

const divider = tv({
  slots: {
    root: '',
    element: 'bg-gray-200'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'w-full mx-auto flex justify-between items-center text-tremor-default text-tremor-content',
        element: 'w-full h-[1px] '
      },
      vertical: {
        root: 'flex justify-between items-stretch text-tremor-default text-tremor-content h-full',
        element: 'h-full w-[1px]'
      }
    },
    hasSpacing: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      hasSpacing: true,
      class: {
        root: 'my-6'
      }
    },
    {
      orientation: 'vertical',
      hasSpacing: true,
      class: {
        root: 'mx-6'
      }
    }
  ]
});

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  hasSpacing?: boolean;
  className?: string;
};
export default function Divider({
  orientation = 'horizontal',
  hasSpacing = true,
  className
}: DividerProps) {
  const { root, element } = divider({ orientation, hasSpacing });

  return (
    <div className={root({ className })}>
      <span className={element()} />
    </div>
  );
}
