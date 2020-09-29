import { Featurebar, Button, Container } from "ui";
import { Navbar, Footer } from "components";

export default function Home() {
  return (
    <>
      <Featurebar
        title="Free Standard Shipping on orders over $99.99"
        description="Due to COVID-19, some orders may experience processing and delivery delays."
      />
      <Navbar />
      <Container className="px-4 py-5 h-screen">
        <div className="grid grid-cols-1 gap-6 h-full lg:grid-cols-3 lg:grid-rows-2">
          <div className="lg:row-span-2 lg:col-span-2 bg-indigo-700 h-full"></div>
          <div className="lg:row-span-1 lg:col-span-1 bg-black h-full"></div>
          <div className="lg:row-span-1 lg:col-span-1 bg-red-500"></div>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
}
