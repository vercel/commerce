import { Layout } from "@components/core";

export default function Home() {
  return (
    <Layout>
      <div className="h-full grid grid-cols-1 h-full lg:grid-cols-3 lg:grid-rows-2">
        <div className="lg:row-span-2 lg:col-span-2 bg-violet h-full"></div>
        <div className="lg:row-span-1 lg:col-span-1 bg-black h-full"></div>
        <div className="lg:row-span-1 lg:col-span-1 bg-pink"></div>
      </div>
    </Layout>
  );
}
