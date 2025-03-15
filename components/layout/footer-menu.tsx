"use client";

import clsx from "clsx";
import Link from "next/link";

import { Menu } from "@/lib/store/menu";

interface FooterMenuProps {
  menu: Menu;
}

export default function FooterMenu({ menu }: FooterMenuProps) {
  if (!menu.items?.length) return null;

  return (
    <nav className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {menu.items.map((item) => (
        <Link
          key={item.title}
          href={item.path}
          className={clsx(
            "text-sm text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
