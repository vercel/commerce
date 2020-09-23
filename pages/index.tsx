import { Featurebar, Button, Container } from "ui";
import { Navbar } from "components";

export default function Home() {
  return (
    <>
      <Navbar />
      <Featurebar
        title="Free Standard Shipping on orders over $99.99"
        description="Due to COVID-19, some orders may experience processing and delivery delays."
      />
      <Container className="py-12">
        <Button>Click Me!</Button>
      </Container>
    </>
  );
}
