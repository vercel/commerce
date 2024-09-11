import Error from 'app/error';
import Footer from 'components/layout/footer';
import { Navbar } from 'components/layout/navbar';
import Search from 'components/layout/navbar/search';
import { PriceBox } from 'components/price-box';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';

//Todo: change to proper metadata
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: 'landing' });

  //Todo: change to proper error handling
  if (!products[0]) return <Error />;

  return (
    <>
      <section className="relative">
        <Navbar />
        <div className="relative h-screen w-screen">
          <Image
            src={
              products[0].featuredImage.url || '' //Todo: default image
            }
            alt={products[0].featuredImage.altText || 'Main product'}
            fill
            objectFit="cover"
            quality={100}
            priority
          />
        </div>
        <div className="absolute bottom-20 flex w-full flex-col items-center text-lightText">
          <h1 className="text-xl">{products[0].title}</h1>
          <span className="mb-6 mt-1 text-sm text-lightText/80">Read more</span>
          <div className="flex w-[384px] justify-center gap-[10px] text-mainBG">
            <PriceBox title="Box of 20" price={2460} />
            <PriceBox title="Single Cigar" price={120} />
          </div>
        </div>
      </section>
      {/* needs to check background-color */}
      <section className="flex justify-between gap-10 bg-black px-[30px]">
        <Search />
        <div className="flex w-full items-center justify-end gap-[10px] text-lightText">
          <span className="text-xs opacity-50">Filter by</span>
          <button type="button" className="text-[15px]">
            Size
          </button>
          <button type="button" className="text-[15px]">
            Strength
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

//temp: for ProductGridItems test
const mockProducts: Product[] = [
  {
    id: 'prod_001',
    handle: 'product-1',
    availableForSale: true,
    title: 'Product 1',
    description: 'This is the description for Product 1',
    descriptionHtml: '<p>This is the <strong>HTML</strong> description for Product 1</p>',
    options: [
      {
        id: 'option_001',
        name: 'Size',
        values: ['S', 'M', 'L']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '100.00',
        currencyCode: 'USD'
      },
      minVariantPrice: {
        amount: '80.00',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://cdn.shopify.com/static/sample-images/garnished.jpeg',
      altText: 'Product 1 Featured Image',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Product 1 SEO Title',
      description: 'This is the SEO description for Product 1'
    },
    tags: ['tag1', 'tag2'],
    updatedAt: new Date().toISOString(),
    variants: [
      {
        id: 'variant_001',
        title: 'Variant 1',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Size',
            value: 'M'
          }
        ],
        price: {
          amount: '90.00',
          currencyCode: 'USD'
        }
      }
    ],
    images: [
      {
        url: 'https://cdn.shopify.com/static/sample-images/garnished.jpeg',
        altText: 'Product 1 Image 1',
        width: 500,
        height: 500
      },
      {
        url: 'https://cdn.shopify.com/static/sample-images/garnished.jpeg',
        altText: 'Product 1 Image 2',
        width: 400,
        height: 400
      }
    ]
  },
  {
    id: 'prod_002',
    handle: 'product-2',
    availableForSale: false,
    title: 'Product 2',
    description: 'This is the description for Product 2',
    descriptionHtml: '<p>This is the <strong>HTML</strong> description for Product 2</p>',
    options: [
      {
        id: 'option_002',
        name: 'Color',
        values: ['Red', 'Blue', 'Green']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '120.00',
        currencyCode: 'USD'
      },
      minVariantPrice: {
        amount: '100.00',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://cdn.shopify.com/static/sample-images/garnished.jpeg',
      altText: 'Product 2 Featured Image',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Product 2 SEO Title',
      description: 'This is the SEO description for Product 2'
    },
    tags: ['tag3', 'tag4'],
    updatedAt: new Date().toISOString(),
    variants: [
      {
        id: 'variant_002',
        title: 'Variant 2',
        availableForSale: false,
        selectedOptions: [
          {
            name: 'Color',
            value: 'Red'
          }
        ],
        price: {
          amount: '110.00',
          currencyCode: 'USD'
        }
      }
    ],
    images: [
      {
        url: 'https://cdn.shopify.com/static/sample-images/garnished.jpeg',
        altText: 'Product 2 Image 1',
        width: 500,
        height: 500
      }
    ]
  }
];
