const Tag = ({ text }: { text: string }) => {
  return (
    <div className="w-fit border-l-4 border-l-primary bg-gray-100 px-2 py-0.5 text-sm">{text}</div>
  );
};

export default Tag;
