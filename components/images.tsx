'use client';

import { Product } from 'lib/shopify/types';
import { ImgHTMLAttributes, useState } from 'react';
import { ImageGallery } from './image-gallery';
import { ImageSlider } from './image-slider';

const transformProductImagesToSlider = (product?: Product) => {
  if (!product?.images) return [];

  return product.images.map(
    (image, index) =>
      ({
        alt: image.altText,
        src: image.url!,
        width: image.width,
        height: image.height,
        loading: index === 0 ? 'eager' : 'lazy'
      }) satisfies ImgHTMLAttributes<HTMLImageElement>
  );
};

const transformProductImagesToGallery = (product?: Product) => {
  if (!product?.images) return [];

  return product.images.map(
    (image) =>
      ({
        id: image.id,
        alt: image.altText,
        src: image.url!,
        width: image.width,
        height: image.height,
        loading: 'lazy'
      }) satisfies ImgHTMLAttributes<HTMLImageElement>
  );
};

export const Images = ({ product }: { product: Product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState('0');
  const galleryImages = transformProductImagesToGallery(product);
  const sliderImages = transformProductImagesToSlider(product);
  return (
    <>
      <ImageSlider
        images={sliderImages}
        selectedImageIndex={selectedImageIndex}
        // TODO: Implement scrollIntoView
        scrollIntoView={() => {
          /* empty */
        }}
      />
      <ImageGallery
        images={galleryImages}
        onSelectImage={(index) => {
          setSelectedImageIndex(index);
        }}
      />
    </>
  );
};
