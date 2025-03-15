"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CartItem } from "lib/store/types";

export function DeleteItemButton({
  item,
  onClick,
}: {
  item: CartItem;
  onClick: () => void;
}) {
  return (
    <button
      aria-label="Remove cart item"
      onClick={onClick}
      className={clsx(
        "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
        {
          "hover:bg-neutral-800": true,
        }
      )}
    >
      <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
    </button>
  );
}
