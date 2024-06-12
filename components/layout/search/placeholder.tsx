const ProductsGridPlaceholder = () => {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="h-96 w-full rounded-lg bg-gray-200" />
      ))}
    </section>
  );
};

export default ProductsGridPlaceholder;
