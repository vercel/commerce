import { useState } from 'react';

import Footer from '@/components/Footer';
import HomePageMain from '@/components/HomePageMain';
import Header from '@/components/layout/Header';
import MobileMenu from '@/components/MobileMenu';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div className='bg-white'>
      <Header setOpen={setOpen} />
      <MobileMenu open={open} setOpen={setOpen} />

      <HomePageMain />

      <Footer />
    </div>
  );
}
