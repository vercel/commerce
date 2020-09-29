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
      <Container className="px-4 py-5  h-screen">
        <Button>Click Me!</Button>
      </Container>
      <Footer></Footer>
    </>
  );
}
