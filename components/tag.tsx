import clsx from 'clsx';

const Tag = ({ text, invert }: { text: string; invert?: boolean }) => {
  return (
    <div
      className={clsx('w-fit border-l-4 border-l-primary px-2 py-0.5 text-sm', {
        'bg-transparent text-white': invert,
        'bg-gray-200/50 text-blue-800': !invert
      })}
    >
      {text}
    </div>
  );
};

export default Tag;
