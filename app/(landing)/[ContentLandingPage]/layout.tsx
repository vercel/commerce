export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">
        <div className="group/page flex min-h-svh flex-col">{children}</div>
      </div>
    </>
  );
}
