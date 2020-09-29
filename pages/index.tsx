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
      <Container className="h-screen">
        <div className="grid grid-cols-1 h-full lg:grid-cols-3 lg:grid-rows-2">
          <div className="lg:row-span-2 lg:col-span-2 bg-violet h-full"></div>
          <div className="lg:row-span-1 lg:col-span-1 bg-black h-full"></div>
          <div className="lg:row-span-1 lg:col-span-1 bg-pink"></div>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
}
