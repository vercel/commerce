import { FunnelIcon } from '@heroicons/react/24/outline';

export function Filter() {
  return (
    <div className="flex w-full items-center justify-end gap-[10px] text-sm text-lightText">
      <FunnelIcon width={18} height={18} opacity={0.5} />
      <button type="button">Size</button>
      <div className="h-[13px] border border-y-0 border-l-0 border-r-lightText/50"></div>
      <button type="button">Strength</button>
    </div>
  );
}
