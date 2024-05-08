import Footer from 'components/layout/footer';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto min-h-[500px] max-w-screen-2xl px-8 pb-4 lg:min-h-[800px]">
        {children}
      </div>
      <Footer />
    </>
  );
}
