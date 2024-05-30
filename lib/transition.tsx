'use client';

import { ReactNode, createContext, use, useTransition } from 'react';

const GlobalTransitionContext = createContext<ReturnType<
  typeof useGlobalTransitionInternal
> | null>(null);

export function useGlobalTransition() {
  const transition = use(GlobalTransitionContext);

  if (transition === null) {
    throw new Error('Make sure to use `GlobalTransitionProvider` first.');
  }

  return transition;
}

function useGlobalTransitionInternal() {
  const [isPending, startTransition] = useTransition();

  return { isPending, startTransition };
}

export function GlobalTransitionProvider({ children }: { children: ReactNode }) {
  const transition = useGlobalTransitionInternal();
  return (
    <GlobalTransitionContext.Provider value={transition}>
      {children}
    </GlobalTransitionContext.Provider>
  );
}
