'use client';

import { Button } from '@headlessui/react';

export default function VendorArea({ token }: { token: string }) {
  const handleClick = () => {
    window.open(`${process.env.NEXT_PUBLIC_WOOCOMMERCE}/sso-login?sso_token=${token}`);
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-2xl font-semibold">Sei un venditore</h2>
      <p className="mb-6 text-center">
        Accedi alla tua area riservata per gestire i tuoi prodotti e ordini.
      </p>
      <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700" onClick={handleClick}>
        Accedi
      </Button>
    </div>
  );
}
