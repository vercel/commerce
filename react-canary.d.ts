// Type definitions for React Canary features
import type * as ReactTypes from 'react';

declare module 'react' {
  interface ViewTransitionComponentProps {
    name?: string;
    children?: ReactTypes.ReactNode;
    enter?: string | Record<string, string>;
    exit?: string | Record<string, string>;
    update?: string | Record<string, string>;
    share?: string | Record<string, string>;
    default?: string | Record<string, string>;
  }

  const ViewTransition: ReactTypes.ComponentType<ViewTransitionComponentProps>;
  function addTransitionType(type: string): void;
}

