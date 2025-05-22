// app/product/[handle]/page.tsx

// Simulate fetching product data
async function getProduct(handle: string) {
  const allProducts: { [key: string]: any } = { // Use 'any' for simplicity in this mock
    'sample-product-1': {
      id: 'prod-1',
      name: 'Awesome T-Shirt',
      description: 'This is the best t-shirt ever. Made from 100% organic cotton.',
      price: { amount: '29.99', currencyCode: 'USD' },
      images: [
        { src: '/placeholder-tshirt-blue.jpg', alt: 'Awesome T-Shirt - Blue' },
        { src: '/placeholder-tshirt-red.jpg', alt: 'Awesome T-Shirt - Red' }
      ],
      variants: [
        { id: 'v1-color', name: 'Color', value: 'Blue' },
        { id: 'v1-size', name: 'Size', value: 'L' },
        { id: 'v1-material', name: 'Material', value: 'Cotton' }
      ]
    },
    'sample-product-2': {
      id: 'prod-2',
      name: 'Cool Gadget Pro',
      description: 'The latest and greatest gadget with amazing features.',
      price: { amount: '199.50', currencyCode: 'USD' },
      images: [
        { src: '/placeholder-gadget-main.jpg', alt: 'Cool Gadget Pro' },
        { src: '/placeholder-gadget-angle.jpg', alt: 'Cool Gadget Pro - Angle View' }
      ],
      variants: [
        { id: 'v2-color', name: 'Color', value: 'Black' },
        { id: 'v2-storage', name: 'Storage', value: '256GB' }
      ]
    },
    'another-item': {
      id: 'prod-3',
      name: 'Simple Mug',
      description: 'A simple mug for your daily coffee or tea.',
      price: { amount: '12.00', currencyCode: 'USD' },
      images: [
        { src: '/placeholder-mug.jpg', alt: 'Simple Mug' }
      ],
      variants: [
        { id: 'v3-color', name: 'Color', value: 'White' },
        { id: 'v3-size', name: 'Size', value: 'Standard' }
      ]
    }
  };
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return allProducts[handle] || null;
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) {
    // In a real app, you might use Next.js's notFound() function here
    return <div style={{ padding: '20px', textAlign: 'center' }}>Product not found for handle: {params.handle}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{product.name}</h1>
      
      {product.images && product.images.length > 0 && (
        <img 
          src={product.images[0].src} 
          alt={product.images[0].alt || product.name} 
          style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px', marginBottom: '20px', border: '1px solid #ddd' }} 
        />
      )}
      
      <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>{product.description}</p>
      
      <p style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '20px 0' }}>
        Price: {product.price.amount} {product.price.currencyCode}
      </p>
      
      <h2>Variants:</h2>
      {product.variants && product.variants.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {product.variants.map((variant: any) => ( // Using any for mock simplicity
            <li key={variant.id} style={{ marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <strong>{variant.name}:</strong> {variant.value}
            </li>
          ))}
        </ul>
      ) : (
        <p>No variants available for this product.</p>
      )}
      
      {/* Add to cart button can be a simple placeholder */}
      <button 
        style={{ 
          padding: '10px 20px', 
          fontSize: '1em', 
          color: 'white', 
          backgroundColor: '#007bff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
