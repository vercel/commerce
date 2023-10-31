import { Suspense } from 'react';

export const revalidate = 300; // 5 minutes in seconds

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
