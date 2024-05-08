import clsx from 'clsx';
import { forwardRef } from 'react';

function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul {...props} className={clsx('grid grid-flow-row gap-4', props.className)}>
      {props.children}
    </ul>
  );
}

const GridItem = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>((props, ref) => {
  return (
    <li {...props} className={clsx('aspect-square transition-opacity', props.className)} ref={ref}>
      {props.children}
    </li>
  );
});

GridItem.displayName = 'GridItem';
Grid.Item = GridItem;

export default Grid;
