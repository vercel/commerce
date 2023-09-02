import { Suspense } from 'react';
//import { dynamic } from "next/render-mode"
import "server-only";

function D({ children }: { children: React.ReactNode }) {
  //dynamic();
  return children;
}

export function Dynamic({fallback, error, children}: {
    fallback: React.ReactNode, 
    error: string,
    children: React.ReactNode
}) {
  return (
    <Suspense fallback={fallback}>
        <D>{children}</D>
    </Suspense>
  );
}