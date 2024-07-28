'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useOptimistic } from 'react';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => void;
  updateImage: (index: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update
    })
  );

  const updateOption = (name: string, value: string) => {
    setOptimisticState({ [name]: value });
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(name, value);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const updateImage = (index: string) => {
    setOptimisticState({ image: index });
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('image', index);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
