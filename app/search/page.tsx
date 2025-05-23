// app/search/page.tsx
'use client'; // Required for using client-side features like useState

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // To get query from URL

// Simulate fetching search results
async function getSearchResults(query: string | null): Promise<any[]> { // Explicit Promise<any[]>
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  if (!query || !query.trim()) { // Also handle empty/whitespace query after trimming
    return []; // Return empty array for null, empty, or whitespace-only query
  }

  const mockResults: { [key: string]: any[] } = {
    'shirt': [
      { id: 'sr1', name: 'Search Result Shirt 1', price: { amount: '29.99', currencyCode: 'USD' }, image: { src: '/placeholder-shirt1.jpg', alt: 'Shirt 1' } },
      { id: 'sr2', name: 'Search Result Shirt 2', price: { amount: '35.50', currencyCode: 'USD' }, image: { src: '/placeholder-shirt2.jpg', alt: 'Shirt 2' } },
    ],
    'accessory': [
      { id: 'sa1', name: 'Search Result Accessory', price: { amount: '12.00', currencyCode: 'USD' }, image: { src: '/placeholder-accessory.jpg', alt: 'Accessory' } },
    ],
    'generic': [ 
      { id: 'g1', name: 'Generic Product A', price: { amount: '10.00', currencyCode: 'USD' }, image: { src: '/placeholder-generic1.jpg', alt: 'Generic A' } },
      { id: 'g2', name: 'Generic Product B', price: { amount: '15.00', currencyCode: 'USD' }, image: { src: '/placeholder-generic2.jpg', alt: 'Generic B' } },
    ]
  };

  const results = mockResults[query.toLowerCase()];
  // If specific results are found, return them. Otherwise, return generic results.
  // If generic results are also somehow undefined (they are not, in this mock), fallback to an empty array.
  return results !== undefined ? results : (mockResults['generic'] || []); 
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  const [query, setQuery] = useState(initialQuery || '');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (currentQuery: string) => {
    if (!currentQuery.trim()) { // Trim query to avoid searching for empty spaces
      setResults([]);
      return;
    }
    setLoading(true);
    const fetchedResults = await getSearchResults(currentQuery);
    setResults(fetchedResults);
    setLoading(false);
  };

  // Perform search when initialQuery (from URL) changes or when component mounts with an initialQuery
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery); // Ensure input field is updated if query comes from URL
      handleSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    // Disabled exhaustive-deps because handleSearch reference might change but we only care about initialQuery
  }, [initialQuery]);


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Search Products</h1>
      <form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          // Update URL with the new search query
          window.history.pushState(null, '', `?q=${encodeURIComponent(query)}`);
          handleSearch(query); 
        }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
      >
        <input 
          type="search" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..." 
          style={{ padding: '10px', fontSize: '1em', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', fontSize: '1em' }}>Search</button>
      </form>

      <p style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '20px', color: '#555' }}>
        Personalization by Relewise will be implemented here.
      </p>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      {!loading && results.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '15px' }}>Results for "{query}"</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {results.map((product) => (
              <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '5px', textAlign: 'center' }}>
                <img src={product.image.src} alt={product.image.alt} style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }} />
                <h3 style={{ fontSize: '1.1em', margin: '0 0 10px 0', minHeight: '44px' }}>{product.name}</h3>
                <p style={{ fontSize: '1em', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                  {product.price.amount} {product.price.currencyCode}
                </p>
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
            ))}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p>No specific results found for "{query}".</p>
          <p style={{ color: '#777' }}>Did you mean: t-shirt, accessory, cap, generic?</p> {/* Placeholder suggestions */}
        </div>
      )}
       {!loading && results.length === 0 && !query && (
        <p style={{ textAlign: 'center', marginTop: '30px', color: '#777' }}>
          Enter a search term above to find products.
        </p>
      )}
    </div>
  );
}
