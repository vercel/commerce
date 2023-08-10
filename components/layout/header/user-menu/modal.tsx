'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import OpenUserMenu from './open-user-menu';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('auth');

  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger aria-label="Open search">
          <OpenUserMenu />
        </SheetTrigger>
        <SheetContent side="right" className="bg-app">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">{t('login.logIn')}</SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="login" className="mt-4 w-full">
            <TabsList>
              <TabsTrigger value="login">{t('login.logIn')}</TabsTrigger>
              <TabsTrigger value="register">{t('signUp.register')}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">Log in to your account here.</TabsContent>
            <TabsContent value="register">Register for account here.</TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}
