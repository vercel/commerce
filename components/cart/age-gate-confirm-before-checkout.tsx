'use client';

import { useAgeConfirmation } from 'app/hooks/use-age-confirmation';
import AgeGateForm from 'components/product/age-gate-form';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';

type AgeConfirmBeforeCheckoutProps = {
  children: ReactNode[] | ReactNode | string;
  checkoutUrl: string;
};

const AgeConfirmBeforeCheckout: FC<AgeConfirmBeforeCheckoutProps> = ({ children, checkoutUrl }) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const { ageConfirmed } = useAgeConfirmation();

  return ageConfirmed ? (
    <>
      <Link
        href={checkoutUrl}
        className="block w-full border border-white/20 bg-dark px-12 py-6 text-center font-sans font-medium uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white hover:text-black"
      >
        {children}
      </Link>
    </>
  ) : (
    <>
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="block w-full border border-white/20 bg-dark px-12 py-6 text-center font-sans font-medium uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white hover:text-black"
      >
        {children}
      </button>
      {!!isConfirming && (
        <AgeGateForm didCancel={() => setIsConfirming(false)} checkoutUrl={checkoutUrl} />
      )}
    </>
  );
};

export default AgeConfirmBeforeCheckout;
