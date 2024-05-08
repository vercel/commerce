import Grid from 'components/grid';

const ProductsGridPlaceholder = () => {
  return (
    <section>
      <Grid className="animate-pulse pt-5 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside className="hidden lg:flex lg:flex-col lg:gap-4">
          <div className="h-32 w-full rounded bg-gray-200" />
          <div className="h-32 w-full rounded bg-gray-200" />
          <div className="h-32 w-full rounded bg-gray-200" />
          <div className="h-32 w-full rounded bg-gray-200" />
        </aside>
        <div className="lg:col-span-2 xl:col-span-3">
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="h-96 w-full rounded-lg bg-gray-200" />
            ))}
          </Grid>
        </div>
      </Grid>
    </section>
  );
};

export default ProductsGridPlaceholder;
