'use client';

/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useEffect, useRef, useState, useTransition } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useAgeConfirmation } from 'app/hooks/use-age-confirmation';
import clsx from 'clsx';
import { isBefore, isValid, parse } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type AgeGateFormProps = {
  checkoutUrl: string;
  didCancel?: () => void;
};

const AgeGateForm: FC<AgeGateFormProps> = ({ checkoutUrl, didCancel }) => {
  const t = useTranslations('Index');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [hasValidDate, setHasValidDate] = useState(false);
  const [month, setMonth] = useState<number>();
  const [day, setDay] = useState<number>();
  const [year, setYear] = useState<number>();

  const { onAgeConfirmed } = useAgeConfirmation();

  const yearFieldRef = useRef(null);

  const minAge = 20;
  const maxAge = 130;

  const save = () => {
    if (hasValidDate) {
      onAgeConfirmed();
      startTransition(() => {
        router.push(checkoutUrl);
      });
    }
  };

  const cancel = () => {
    if (didCancel) {
      didCancel();
    }
  };

  useEffect(() => {
    const now = new Date();
    const thresholdDate = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());
    const minDate = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());
    if (month && day && year) {
      const date = parse(`${month}-${day}-${year}`, 'MM-dd-yyyy', new Date());
      const oldEnough = isBefore(date, thresholdDate);
      const tooOld = isBefore(date, minDate);
      setHasValidDate(isValid(date) && oldEnough && !tooOld);
    } else {
      setHasValidDate(false);
    }
  }, [month, day, year]);

  return (
    <>
      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          initialFocus={yearFieldRef}
          onClose={() => {}}
        >
          <div
            className={clsx(
              'flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-dark bg-opacity-80 backdrop-blur-sm transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block transform space-y-6 overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom text-dark shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <CheckIcon
                      className="h-6 w-6 text-green-600 dark:text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-dark dark:text-white"
                    >
                      {t('age-gate.title')}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="dark:text-secondary-neutral text-sm text-white">
                        {t('age-gate.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-center text-sm font-medium">{t('age-gate.birthdate')}</div>
                </div>
                <div>
                  <div className="flex flex-row justify-center space-x-2">
                    <div className="flex flex-col items-start space-y-1">
                      <input
                        type="text"
                        className="w-full border bg-white p-2 text-center selection:bg-emerald-200"
                        ref={yearFieldRef}
                        placeholder="YYYY"
                        maxLength={4}
                        onChange={(e) => setYear(parseInt(e?.target?.value))}
                      />
                      <div className="w-full text-center text-xs">{t('age-gate.year')}</div>
                    </div>

                    <div className="flex flex-col items-start space-y-1">
                      <input
                        type="text"
                        className="w-full border bg-white p-2 text-center selection:bg-emerald-200"
                        placeholder="MM"
                        maxLength={2}
                        onChange={(e) => setMonth(parseInt(e?.target?.value))}
                      />
                      <div className="w-full text-center text-xs">{t('age-gate.month')}</div>
                    </div>
                    <div className="flex flex-col items-start space-y-1">
                      <input
                        type="text"
                        className="w-full border bg-white p-2 text-center selection:bg-emerald-200"
                        placeholder="DD"
                        maxLength={2}
                        onChange={(e) => setDay(parseInt(e?.target?.value))}
                      />
                      <div className="w-full text-center text-xs">{t('age-gate.day')}</div>
                    </div>
                  </div>
                </div>
                <div className="text-black sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className={clsx(
                      'inline-flex w-full justify-center',
                      hasValidDate
                        ? 'border border-dark hover:border-dark/50'
                        : 'border border-dark/50 hover:border-dark/20',
                      'bg-white px-4 py-2',
                      'text-base font-medium text-black',
                      'shadow-sm transition-colors duration-300',
                      'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      'disabled:border-dark/50 disabled:hover:border-dark/50',
                      'sm:col-start-2 sm:text-sm'
                    )}
                    onClick={() => save()}
                    disabled={!hasValidDate}
                  >
                    {isPending ? t('age-gate.confirming') : t('age-gate.confirm')}
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      'mt-3 inline-flex w-full justify-center',
                      'border border-dark/50 hover:border-dark/20',
                      'bg-white px-4 py-2',
                      'text-base font-medium',
                      'text-black shadow-sm transition-all duration-300 hover:bg-white hover:bg-opacity-20',
                      'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
                      'sm:col-start-1 sm:mt-0 sm:text-sm',
                      'disabled:border-dark/50 disabled:hover:border-dark/50'
                    )}
                    onClick={() => cancel()}
                    disabled={isPending}
                  >
                    {t('age-gate.deny')}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AgeGateForm;
