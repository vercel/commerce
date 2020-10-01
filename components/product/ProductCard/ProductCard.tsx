import cn from "classnames";
import s from "./ProductCard.module.css";
import React, { FunctionComponent } from "react";

interface Props {
  className?: string;
  children?: any;
}

const ProductCard: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);
  return (
    <div className={rootClassName}>
      <div className="absolute">
        <h1 className="px-8 py-2 bg-violet text-white font-bold text-3xl">
          {/* {productData.title} */}
        </h1>
        <div className="px-6 py-2 pb-4 bg-violet text-white font-semibold inline-block">
          {/* {productData.price} */}
        </div>
      </div>
      <div className="flex-1 h-full p-24">
        <div className="bg-violet h-full"></div>
      </div>
    </div>
  );
};

export default ProductCard;
