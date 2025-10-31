import { readFile } from 'fs/promises';
import { getProduct } from 'lib/shopify';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { join } from 'path';

export default async function Image({
  params
}: {
  params: Promise<{ handle: string }>;
}): Promise<ImageResponse> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  const file = await readFile(join(process.cwd(), './fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  // Format price similar to Price component
  const { amount, currencyCode } = product.priceRange.minVariantPrice;
  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(parseFloat(amount));

  // Use product featured image if available
  const hasImage = product.featuredImage?.url;
  
  // Calculate dimensions to maintain aspect ratio
  let imageStyle = {};
  if (hasImage && product.featuredImage.width && product.featuredImage.height) {
    const sourceAspectRatio = product.featuredImage.width / product.featuredImage.height;
    const ogAspectRatio = 1200 / 630;
    
    if (sourceAspectRatio > ogAspectRatio) {
      // Source is wider - fit to width, center vertically
      const height = 1200 / sourceAspectRatio;
      const top = (630 - height) / 2;
      imageStyle = {
        width: '1200px',
        height: `${height}px`,
        position: 'absolute',
        top: `${top}px`,
        left: '0px'
      };
    } else {
      // Source is taller - fit to height, center horizontally
      const width = 630 * sourceAspectRatio;
      const left = (1200 - width) / 2;
      imageStyle = {
        width: `${width}px`,
        height: '630px',
        position: 'absolute',
        top: '0px',
        left: `${left}px`
      };
    }
  }

  return new ImageResponse(
    (
      <div tw="flex h-full w-full relative bg-white">
        {/* Product Image Background - maintains aspect ratio */}
        {hasImage ? (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            style={imageStyle}
          />
        ) : null}

        {/* Overlay gradient for better text visibility */}
        {hasImage && (
          <div tw="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        )}

        {/* Price Overlay Pill - positioned in bottom right corner */}
        <div tw="absolute bottom-12 right-12 flex items-center justify-center px-8 py-4 bg-blue-600 rounded-full">
          <p tw="text-white text-4xl font-bold m-0">{formattedPrice}</p>
        </div>

        {/* Product Title (optional, shown if no image) */}
        {!hasImage && (
          <div tw="flex flex-col items-center justify-center h-full w-full px-12">
            <h1 tw="text-6xl font-bold text-black text-center mb-8">{product.title}</h1>
            <div tw="flex items-center justify-center px-8 py-4 bg-blue-600 rounded-full">
              <p tw="text-white text-4xl font-bold m-0">{formattedPrice}</p>
            </div>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}

