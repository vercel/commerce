// app/search/[collection]/page.tsx

// Simulate fetching products for a collection
async function getProductsByCollection(collectionName: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));

  const allProducts: { [key: string]: any[] } = {
    't-shirts': [
      { id: 'ts1', name: 'Cool T-Shirt', price: { amount: '19.99', currencyCode: 'USD' }, image: { src: '/placeholder-tshirt1.jpg', alt: 'T-Shirt 1' } },
      { id: 'ts2', name: 'Graphic Tee', price: { amount: '24.99', currencyCode: 'USD' }, image: { src: '/placeholder-tshirt2.jpg', alt: 'T-Shirt 2' } },
      { id: 'ts3', name: 'Plain V-Neck', price: { amount: '15.50', currencyCode: 'USD' }, image: { src: '/placeholder-tshirt3.jpg', alt: 'Plain V-Neck' } },
    ],
    'accessories': [
      { id: 'ac1', name: 'Stylish Cap', price: { amount: '15.00', currencyCode: 'USD' }, image: { src: '/placeholder-cap.jpg', alt: 'Cap' } },
      { id: 'ac2', name: 'Leather Belt', price: { amount: '35.00', currencyCode: 'USD' }, image: { src: '/placeholder-belt.jpg', alt: 'Leather Belt' } },
    ],
    'footwear': [
      { id: 'fw1', name: 'Running Shoes', price: { amount: '79.99', currencyCode: 'USD' }, image: { src: '/placeholder-shoes1.jpg', alt: 'Running Shoes' } },
      { id: 'fw2', name: 'Casual Sneakers', price: { amount: '65.00', currencyCode: 'USD' }, image: { src: '/placeholder-sneakers1.jpg', alt: 'Casual Sneakers' } },
      { id: 'fw3', name: 'Formal Shoes', price: { amount: '120.00', currencyCode: 'USD' }, image: { src: '/placeholder-shoes2.jpg', alt: 'Formal Shoes' } },
    ]
    // Add more dummy collections and products as needed
  };
  return allProducts[collectionName.toLowerCase()] || [];
}

export default async function CollectionPage({ params }: { params: { collection: string } }) {
  const products = await getProductsByCollection(params.collection);
  const collectionName = params.collection.charAt(0).toUpperCase() + params.collection.slice(1);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Products in: {collectionName}
      </h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        {/* Placeholder Filters */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', width: '250px' }}>
          <h3 style={{ marginTop: '0', marginBottom: '15px' }}>Filters</h3>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="category-filter" style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
            <select id="category-filter" style={{ width: '100%', padding: '8px' }}>
              <option value="">All {collectionName}</option>
              <option value="cat1">Sub-Category 1</option>
              <option value="cat2">Sub-Category 2</option>
              <option value="cat3">Sub-Category 3</option>
            </select>
          </div>
          <div>
            <label htmlFor="price-range-filter" style={{ display: 'block', marginBottom: '5px' }}>Price Range:</label>
            <input type="range" id="price-range-filter" min="0" max="200" defaultValue="100" style={{ width: '100%' }} />
            {/* Basic display of range value - not functional */}
            <div style={{ textAlign: 'center', fontSize: '0.9em', marginTop: '5px' }}>$0 - $200</div>
          </div>
        </div>

        {/* Main Content Area (Search + Product List) */}
        <div style={{ flex: 1 }}>
          {/* Placeholder Search Input */}
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="search" 
              placeholder={`Search within ${collectionName}...`} 
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontSize: '1em' }} 
            />
          </div>

          {/* Product List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {products.length > 0 ? (
              products.map((product: any) => ( // Using any for mock simplicity
                <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '5px', textAlign: 'center' }}>
                  <img 
                    src={product.image.src} 
                    alt={product.image.alt} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }} 
                  />
                  <h2 style={{ fontSize: '1.1em', margin: '0 0 10px 0' }}>{product.name}</h2>
                  <p style={{ fontSize: '1em', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                    {product.price.amount} {product.price.currencyCode}
                  </p>
                  {/* Use a generic link for now; specific product pages are handled by [handle] route */}
                  <a 
                    href={`/product/${product.id}`} // Assuming product.id can be a handle
                    style={{ 
                      display: 'inline-block', 
                      padding: '8px 15px', 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      textDecoration: 'none', 
                      borderRadius: '3px' 
                    }}
                  >
                    View Details
                  </a>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1' }}>No products found in this collection.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
