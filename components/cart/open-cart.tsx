import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center border border-seam text-bone transition-colors hover:border-bone/40">
      <ShoppingCartIcon
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />

      {quantity ? (
        <div className="absolute top-0 right-0 -mt-2 -mr-2 flex h-4 w-4 items-center justify-center bg-field font-mono text-[10px] font-semibold text-night">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
