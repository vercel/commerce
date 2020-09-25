import {
  CommerceProvider,
  Connector,
  HookResolver,
  useCommerce as useComm,
} from '../commerce';

export type Cart = any;

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText;
  } catch (error) {
    return res.statusText;
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json();
    return data.errors[0];
  }
  return { message: await getText(res) };
}

async function fetcher(
  url: string,
  query: string,
  resolver: HookResolver<Cart>
) {
  const res = await fetch(url);

  if (res.ok) {
    return res.json();
  }

  throw await getError(res);
}

export const bigcommerce: Connector<Cart> = {
  hooks: {
    useCart: {
      query: '',
      resolver() {
        return;
      },
    },
    useAddItem: {
      query: '',
      resolver() {
        return;
      },
    },
    useUpdateItem: {
      query: '',
      resolver() {
        return;
      },
    },
    useRemoveItem: {
      query: '',
      resolver() {
        return;
      },
    },
  },
  locale: 'en-us',
  fetcher,
};

// TODO: The connector should be extendable when a developer is using it
export function BigcommerceProvider({ children }) {
  return (
    <CommerceProvider connector={bigcommerce}>{children}</CommerceProvider>
  );
}

export const useCommerce = () => useComm<Cart>();
