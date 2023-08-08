'use client';

import MenuIcon from '@/components/icons/menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function MobileModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger aria-label="Open menu">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-ui-border text-high-contrast transition-colors">
            <MenuIcon className="h-4 stroke-current transition-all ease-in-out hover:scale-110" />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="bg-app">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
