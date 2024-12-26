export default async function CheckoutPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <h1>Checkout</h1>
    </section>
  );
}