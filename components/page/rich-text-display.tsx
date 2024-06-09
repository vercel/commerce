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
      listType: 'bullet' | 'ordered';
      children: Array<{ type: 'listItem'; children: Text[] }>;
    }
  | { type: 'listItem'; children: Text[] };

const RichTextBlock = ({ block }: { block: Content }) => {
  if (block.type === 'text') {
    return block.bold ? (
      <strong className="font-semibold">{block.value}</strong>
    ) : (
      <span className="font-normal">{block.value}</span>
    );
  }

  if (block.type === 'listItem') {
    return block.children.map((child, index) => <RichTextBlock key={index} block={child} />);
  }

  if (block.type === 'list' && block.listType === 'ordered') {
    return (
      <ol className="ml-10 list-decimal">
        {block.children.map((child, index) => (
          <li key={index}>
            <RichTextBlock block={child} />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <p className="text-blue-200">
      {block.children.map((child, index) => (
        <RichTextBlock key={index} block={child} />
      ))}
    </p>
  );
};

const RichTextDisplay = ({ contentBlocks }: { contentBlocks: Content[] }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {contentBlocks.map((block, index) => (
        <RichTextBlock key={index} block={block} />
      ))}
    </div>
  );
};

export default RichTextDisplay;
