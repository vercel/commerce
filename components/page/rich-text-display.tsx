type Content =
  | { type: 'paragraph'; children: Array<{ type: 'text'; value: string; bold?: boolean }> }
  | {
      type: 'text';
      value: string;
      bold?: boolean;
    };

const RichTextBlock = ({ block }: { block: Content }) => {
  if (block.type === 'text') {
    return block.bold ? (
      <strong className="font-semibold">{block.value}</strong>
    ) : (
      <span>{block.value}</span>
    );
  }

  return (
    <p className="text-gray-800">
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
