import { createContext, ReactNode, useContext } from 'react';

const Commerce = createContext<Connector<any>>(null);

export type Cart = any;

export type CommerceProps<C extends Cart> = {
  children?: ReactNode;
  connector: Connector<C>;
};

export type Connector<C extends Cart> = {
  hooks: {
    useCart: Hook<C>;
    useAddItem: Hook<C>;
    useUpdateItem: Hook<C>;
    useRemoveItem: Hook<C>;
  };
  fetcher: Fetcher<any>;
  locale: string;
};

export type Hook<T extends any> = {
  query?: string;
  url?: string;
  resolver: HookResolver<T>;
};

export type HookResolver<T> = (
  fetcher: Fetcher<T>,
  context: ResolverContext
) => T | Promise<T>;

export type Fetcher<T> = (...args: any) => T | Promise<T>;

export type ResolverContext = {
  query?: string;
  locale: string;
};

export function CommerceProvider({ children, connector }: CommerceProps<Cart>) {
  if (!connector) {
    throw new Error(
      'CommerceProvider requires a valid headless commerce connector'
    );
  }

  return <Commerce.Provider value={connector}>{children}</Commerce.Provider>;
}

export function useCommerce<C extends Cart>() {
  return useContext(Commerce) as Connector<C>;
}
