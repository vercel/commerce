'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useOptimistic } from 'react';

type ProductOptionsState = {
  [key: string]: string;
};

type ProductOptionsAction = { type: 'UPDATE_OPTION'; payload: { name: string; value: string } };

type ProductOptionsContextType = {
  options: ProductOptionsState;
  updateOption: (name: string, value: string) => void;
};

const ProductOptionsContext = createContext<ProductOptionsContextType | undefined>(undefined);

function productOptionsReducer(
  state: ProductOptionsState,
  action: ProductOptionsAction
): ProductOptionsState {
  switch (action.type) {
    case 'UPDATE_OPTION': {
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    }
    default:
      return state;
  }
}

export function ProductOptionsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialOptions = () => {
    const params: ProductOptionsState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [options, updateOptions] = useOptimistic(getInitialOptions(), productOptionsReducer);

  const updateOption = (name: string, value: string) => {
    updateOptions({ type: 'UPDATE_OPTION', payload: { name, value } });
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(name, value);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const value = useMemo(
    () => ({
      options,
      updateOption
    }),
    [options]
  );

  return <ProductOptionsContext.Provider value={value}>{children}</ProductOptionsContext.Provider>;
}

export function useProductOptions() {
  const context = useContext(ProductOptionsContext);
  if (context === undefined) {
    throw new Error('useProductOptions must be used within a ProductOptionsProvider');
  }
  return context;
}
