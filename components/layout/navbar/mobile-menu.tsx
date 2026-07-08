"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Search, { SearchSkeleton } from "./search";

/**
 * Full-screen mobile navigation built on native primitives: a fixed panel
 * with CSS transitions, `inert` while closed, Escape-to-close, and body
 * scroll locking.
 */
export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  // Portaled to <body>: the sticky navbar's backdrop-blur would otherwise
  // become the containing block for this fixed panel and clip it.
  const [isMounted, setIsMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
        className="flex h-11 w-11 items-center justify-center border border-seam text-bone transition-colors md:hidden"
      >
        <Bars3Icon className="h-4" />
      </button>
      {isMounted
        ? createPortal(
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              tabIndex={-1}
              inert={!isOpen}
              className={`fixed inset-0 z-50 flex h-full w-full flex-col bg-night pb-6 transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center border border-seam text-bone transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-8 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu, i) => (
                      <li
                        className="border-b border-seam py-4 font-display text-2xl font-semibold tracking-[0.14em] text-bone uppercase transition-colors hover:text-field"
                        key={item.title}
                      >
                        <Link
                          href={item.path}
                          prefetch={true}
                          onClick={closeMobileMenu}
                          className="flex items-baseline gap-4"
                        >
                          <span className="font-mono text-[10px] tracking-[0.3em] text-bone/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
