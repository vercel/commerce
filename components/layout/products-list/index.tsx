'use client';

import { Button } from '@headlessui/react';
import clsx from 'clsx';
import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import LoadingDots from 'components/loading-dots';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';
import { getProductsInCollection, searchProducts } from './actions';

const ProductsList = ({
  initialProducts,
  pageInfo,
  searchParams,
  collection
}: {
  initialProducts: Product[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
  collection?: string;
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [_pageInfo, setPageInfo] = useState(pageInfo);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLoadMore = async () => {
    try {
      const params = {
        searchParams,
        afterCursor: _pageInfo.endCursor,
        collection
      };
      setIsLoading(true);
      const { products, pageInfo } = collection
        ? await getProductsInCollection(params)
        : await searchProducts(params);

      setProducts((prev) => [...prev, ...products]);
      setPageInfo({
        hasNextPage: pageInfo.hasNextPage,
        endCursor: pageInfo.endCursor
      });
    } catch (error) {
      console.log('Failed to fetch products', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid className="hide-scrollbar max-h-[1000px] grid-cols-1 overflow-y-auto border-b border-gray-100 pb-4 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
        {products.map((product, index) => (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <GridTileImage
              alt={product.title}
              product={product}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              href={`/product/${product.handle}`}
              priority={index > 10 ? false : true}
            />
          </Grid.Item>
        ))}
      </Grid>
      {_pageInfo.hasNextPage && (
        <div className="mt-4 w-full">
          <Button
            className={clsx(
              'mx-auto flex items-center gap-2 rounded border border-gray-600 px-2 py-1',
              { 'opacity-50': isLoading },
              { 'opacity-100': !isLoading }
            )}
            onClick={handleClickLoadMore}
            disabled={isLoading}
          >
            {isLoading && <LoadingDots className="bg-black" />}
            Load more products
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductsList;
