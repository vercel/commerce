import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./ProductView.module.css";
import { Button } from "@components/ui";
import { Swatch } from "@components/product";
import { Colors } from "@components/types";
interface ProductData {
  title: string;
  price: string;
  description: string;
  colors: [Colors];
  sizes: [string];
}

interface Props {
  className?: string;
  children?: any;
  productData: ProductData;
}

const ProductView: FunctionComponent<Props> = ({ productData, className }) => {
  const rootClassName = cn(s.root, className);
  console.log(productData);
  return (
    <div className={rootClassName}>
      <div className="absolute">
        <h1 className="px-8 py-2 bg-violet text-white font-bold text-3xl">
          {productData.title}
        </h1>
        <div className="px-6 py-2 pb-4 bg-violet text-white font-semibold inline-block">
          {productData.price}
        </div>
      </div>
      <div className="flex-1 h-full p-24">
        <div className="bg-violet h-full"></div>
      </div>
      <div className="flex-1 flex flex-col">
        <section className="pb-4">
          <h2 className="uppercase font-medium">Color</h2>
          <div className="flex flex-row py-4">
            {productData.colors.map((c) => (
              <Swatch color={c} />
            ))}
          </div>
        </section>
        <section className="pb-4">
          <h2 className="uppercase font-medium">Size</h2>
          <div className="flex flex-row py-4">
            <Swatch size="S" />
            <Swatch size="M" />
            <Swatch size="L" />
            <Swatch size="XL" />
            <Swatch size="XXL" />
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
