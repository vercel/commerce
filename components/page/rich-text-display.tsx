import clsx from 'clsx';
import { cn } from 'lib/utils';
import Link from 'next/link';

type Text = {
  type: 'text';
  value: string;
  bold?: boolean;
};

type Content =
  | { type: 'paragraph'; children: Text[] }
  | Text
  | {
      type: 'list';
      listType: 'bullet' | 'ordered' | 'unordered';
      children: Array<{ type: 'listItem'; children: Text[] }>;
    }
  | { type: 'listItem'; children: Text[] }
  | { type: 'link'; children: Text[]; target: string; title: string; url: string }
  | {
      type: 'heading';
      level: number;
      children: Text[];
    };

const RichTextBlock = ({ block, className }: { block: Content; className?: string }) => {
  if (block.type === 'text') {
    return block.bold ? (
      <strong className="font-semibold">{block.value}</strong>
    ) : (
      <span className={cn('font-normal', className)}>{block.value}</span>
    );
  }

  if (block.type === 'heading') {
    const Heading = `h${block.level}` as keyof JSX.IntrinsicElements;
    return (
      <Heading
        className={clsx('text-black-700', {
          'text-3xl': block.level === 2,
          'text-2xl': block.level === 3,
          'text-lg': block.level === 4,
          'text-base': block.level === 5,
          'text-sm': block.level === 6
        })}
      >
        {block.children.map((child, index) => (
          <RichTextBlock key={index} block={child} className="font-semibold" />
        ))}
      </Heading>
    );
  }

  if (block.type === 'link') {
    return (
      <Link href={block.url} target={block.target} title={block.title} className="underline">
        {block.children[0]?.value || block.title}
      </Link>
    );
  }

  if (block.type === 'listItem') {
    return block.children.map((child, index) => <RichTextBlock key={index} block={child} />);
  }

  if (block.type === 'list') {
    return (
      <ol
        className={clsx('spacy-y-0.5 ml-7', {
          'list-decimal': block.listType === 'ordered',
          'list-disc': block.listType === 'unordered'
        })}
      >
        {block.children.map((child, index) => (
          <li key={index}>
            <RichTextBlock block={child} />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <p className="text-content-strong">
      {block.children.map((child, index) => (
        <RichTextBlock key={index} block={child} />
      ))}
    </p>
  );
};

const RichTextDisplay = ({ contentBlocks }: { contentBlocks: Content[] }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {contentBlocks.map((block, index) => (
        <RichTextBlock key={index} block={block} />
      ))}
    </div>
  );
};

export default RichTextDisplay;
