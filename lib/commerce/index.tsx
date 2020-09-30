import { createContext, ReactNode, useContext } from 'react';

const Commerce = createContext<Connector>(null);

export type CommerceProps = {
  children?: ReactNode;
  connector: Connector;
};

export type Connector = {
  fetcher: Fetcher<any>;
  locale: string;
};

export type Fetcher<T> = (...args: any) => T | Promise<T>;

export function CommerceProvider({ children, connector }: CommerceProps) {
  if (!connector) {
    throw new Error(
      'CommerceProvider requires a valid headless commerce connector'
    );
  }

  return <Commerce.Provider value={connector}>{children}</Commerce.Provider>;
}

export function useCommerce<T extends Connector>() {
  return useContext(Commerce) as T;
}
