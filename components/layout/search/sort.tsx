import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export function Sort() {
  return (
    <div className="flex w-fit items-center justify-end gap-[10px] whitespace-nowrap text-sm text-lightText">
      <ArrowsUpDownIcon width={18} height={18} opacity={0.5} />
      <button type="button">A-Z</button>
      <div className="h-[13px] border border-y-0 border-l-0 border-r-lightText/50"></div>
      <button type="button">Price</button>
    </div>
  );
}
