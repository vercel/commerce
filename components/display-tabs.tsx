'use client';

import clsx from 'clsx';
import { useState } from 'react';

type DisplayTabsProps = {
  items: string[];
};
const DisplayTabs = ({ items }: DisplayTabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="flex w-fit items-center rounded bg-gray-100 p-1">
      {items.map((item, index) => (
        <button
          onClick={() => setSelectedIndex(index)}
          key={item}
          className={clsx(
            'min-w-[130px] cursor-pointer rounded py-1 text-center text-sm font-medium',
            {
              'bg-white text-primary': index === selectedIndex,
              'bg-transparent text-gray-600': index !== selectedIndex
            }
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default DisplayTabs;
