import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

// Simulate fetching page configuration from a CMS
const pageConfig = {
  showFeaturedProducts: true,
  showPromotions: true
};

// Placeholder Product Item Component
function ProductItem({ name, price, imageUrl }: { name: string; price: string; imageUrl: string }) {
  return (
    <div style={{ border: '1px solid #eee', padding: '16px', textAlign: 'center' }}>
      <img src={imageUrl} alt={name} style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }} />
      <h3>{name}</h3>
      <p>{price}</p>
    </div>
  );
}

// Placeholder Promotion Banner Component
function PromotionBanner({ title, imageUrl }: { title: string; imageUrl: string }) {
  return (
    <div style={{ border: '1px solid #eee', padding: '16px', textAlign: 'center', margin: '16px 0' }}>
      <img src={imageUrl} alt={title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }} />
      <h2>{title}</h2>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Existing components can remain if they are part of the desired layout */}
      <ThreeItemGrid />
      <Carousel />

      {pageConfig.showFeaturedProducts && (
        <section style={{ padding: '20px' }}>
          <h2>Featured Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <ProductItem name="Awesome T-Shirt" price="$29.99" imageUrl="/placeholder-product1.jpg" />
            <ProductItem name="Cool Gadget" price="$99.50" imageUrl="/placeholder-product2.jpg" />
            <ProductItem name="Stylish Hat" price="$19.75" imageUrl="/placeholder-product3.jpg" />
            <ProductItem name="Generic Item" price="$10.00" imageUrl="/placeholder-product4.jpg" />
          </div>
        </section>
      )}

      {pageConfig.showPromotions && (
        <section style={{ padding: '20px' }}>
          <h2>Promotions</h2>
          <PromotionBanner title="Summer Sale!" imageUrl="/placeholder-promo1.jpg" />
          <PromotionBanner title="New Arrivals" imageUrl="/placeholder-promo2.jpg" />
        </section>
      )}

      <Footer />
    </>
  );
}
