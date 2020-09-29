import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./ProductView.module.css";
import { Button } from "@components/ui";

interface ProductData {
  description: string;
}

interface Props {
  className?: string;
  children?: any;
  productData: ProductData;
}

const ProductView: FunctionComponent<Props> = ({ productData, className }) => {
  const rootClassName = cn(s.root, className);
  return (
    <div className={rootClassName}>
      <div className="absolute">
        <h1 className="px-8 py-2 bg-violet text-white font-bold text-3xl">
          T-Shirt
        </h1>
        <div className="px-6 py-2 pb-4 bg-violet text-white font-semibold inline-block">
          $50
        </div>
      </div>
      <div className="flex-1 h-full p-24">
        <div className="bg-violet h-full"></div>
      </div>
      <div className="flex-1 flex flex-col">
        <section className="pb-4">
          <h2 className="uppercase font-medium">Color</h2>
          <div className="flex flex-row py-4">
            <span className="h-12 w-12 bg-black rounded-full mr-3"></span>
            <span className="h-12 w-12 bg-white rounded-full mr-3 border border-gray-200"></span>
            <span className="h-12 w-12 bg-pink rounded-full"></span>
          </div>
        </section>
        <section className="pb-4">
          <h2 className="uppercase font-medium">Size</h2>
          <div className="flex flex-row py-4">
            <span className="h-12 w-12 bg-white rounded-full mr-3 border border-gray-200 flex items-center justify-center cursor-pointer">
              S
            </span>
            <span className="h-12 w-12 bg-white rounded-full mr-3 border border-gray-200 flex items-center justify-center cursor-pointer">
              M
            </span>
            <span className="h-12 w-12 bg-white rounded-full mr-3 border border-gray-900 flex items-center justify-center cursor-pointer">
              L
            </span>
            <span className="h-12 w-12 bg-white rounded-full mr-3 border border-gray-200 flex items-center justify-center cursor-pointer">
              XL
            </span>
            <span className="h-12 w-12 bg-white rounded-full mr-3 border border-gray-200 flex items-center justify-center cursor-pointer">
              XXL
            </span>
          </div>
        </section>
        <section className="pb-12">
          <p>{productData.description}</p>
        </section>
        <section className="pb-4">
          <Button className={s.button}>Add to Cart</Button>
        </section>
      </div>
    </div>
  );
};

export default ProductView;
