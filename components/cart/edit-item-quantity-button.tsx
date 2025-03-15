"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CartItem } from "lib/store/types";

export function EditItemQuantityButton({
  item,
  type,
  onClick,
}: {
  item: CartItem;
  type: "plus" | "minus";
  onClick: () => void;
}) {
  return (
    <button
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      onClick={onClick}
      className={clsx(
        "flex h-full min-w-[36px] max-w-[36px] items-center justify-center px-2",
        {
          "cursor-not-allowed": type === "minus" && item.quantity === 1,
          "cursor-pointer": type === "plus" || item.quantity > 1,
        }
      )}
      disabled={type === "minus" && item.quantity === 1}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}
