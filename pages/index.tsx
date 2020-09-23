import { Featurebar, Button } from "ui";

export default function Home() {
  return (
    <div>
      <main>
        <Featurebar
          title="Free Standard Shipping on orders over $99.99"
          description="Due to COVID-19, some orders may experience processing and delivery delays."
        />
        <Button>Click Me!</Button>
      </main>
    </div>
  );
}
