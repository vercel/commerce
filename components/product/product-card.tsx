'use client';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Price from 'components/price';
import { Product } from 'lib/woocomerce/models/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="md:col-span-2 md:row-span-1">
      <Card
        isPressable
        shadow="sm"
        onPress={() => router.push(`/product/${product.slug}`)}
        className="h-full w-full"
      >
        <CardBody className="p-0">
          <Image
            alt={product.name}
            className="h-full w-full object-cover"
            src={product.images?.[0]?.src || ''}
            width={540}
            height={540}
          />
        </CardBody>
        <CardFooter className="flex-col items-center justify-center py-6">
          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 font-bold leading-none tracking-tight">
            {product.name}
          </h3>
          <Price className="mt-2" amount={product.price} currencyCode="EUR" />
        </CardFooter>
      </Card>
    </div>
  );
}
