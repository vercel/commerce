'use client';

import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from 'components/icons/close';
import MenuIcon from 'components/icons/menu';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import { LanguageControl, SupportedLocales } from '../navbar/language-control';

export function MenuModal() {
  const t = useTranslations('Index');
  const locale = useLocale();
  let [isOpen, setIsOpen] = useState(false);
  let closeButtonRef = useRef(null);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="transition-all ease-in-out hover:scale-110"
      >
        <MenuIcon />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
          {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-20" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 z-30 backdrop-blur-sm">
              <Dialog.Panel>
                <div className="fixed right-5 top-6 z-40 px-2 py-1 md:top-11">
                  <div className="flex flex-row space-x-6">
                    <LanguageControl lang={locale as SupportedLocales} />

                    <button ref={closeButtonRef} onClick={close} className="">
                      <CloseIcon className="h-10 w-10 stroke-current transition-opacity duration-150 hover:opacity-50" />
                    </button>
                  </div>
                </div>

                <div className="fixed inset-0 grid grid-cols-1 place-content-center bg-dark/80">
                  <div className="flex flex-row justify-end">
                    <div className="flex flex-col space-y-4 px-6 text-right">
                      <div>
                        <Link
                          href="/products"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.products')}
                        </Link>
                      </div>

                      <div>
                        <Link
                          href="/shops"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.shops')}
                        </Link>
                      </div>

                      <div>
                        <Link
                          href="/about"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.about')}
                        </Link>
                      </div>

                      <div>
                        <Link
                          href="/bar"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.bar')}
                        </Link>
                      </div>

                      <div>
                        <Link
                          href="/concept"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.concept')}
                        </Link>
                      </div>

                      <div>
                        <Link
                          href="/stories"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.stories')}
                        </Link>
                      </div>

                      <div>
                        <Link
                          href="/company"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.company')}
                        </Link>
                      </div>

                      <div>
                        <Link
                          href="/contact"
                          className="font-serif text-4xl font-normal transition-opacity duration-150 hover:opacity-50"
                        >
                          {t('menu.contact')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
