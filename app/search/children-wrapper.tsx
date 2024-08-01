'use client';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

export default function ChildrenWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return <Fragment key={searchParams.get('q')}>{children}</Fragment>;
}
