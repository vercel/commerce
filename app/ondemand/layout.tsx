import Navbar from 'components/ondemand/navbar';
import { ReactNode } from 'react';

export default function OndemandLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>;
    </>
  );
}
