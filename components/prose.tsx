import clsx from 'clsx';
import type { FunctionComponent } from 'react';

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  return (
    <div
      className={clsx(
        'prose text-lg leading-7',
        'font-multilingual text-[15px] font-extralight text-white',
        'prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-white',
        'prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg',
        'prose-a:text-white/80 prose-a:underline hover:prose-a:text-white',
        'prose-strong:text-white',
        'prose-td:border-opacity-20 prose-td:py-4 prose-td:font-normal',
        'prose-tr:border-subtle',
        'prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6',
        'dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white',
        '!tracking-normal',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default Prose;
