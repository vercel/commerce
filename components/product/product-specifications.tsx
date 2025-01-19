'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import Prose from 'components/prose';
import { Product } from 'lib/woocomerce/models/product';

export default function ProductSpecifications({ product }: { product: Product }) {
  return (
    <Accordion selectionMode="multiple">
      {product.description ? (
        <AccordionItem key="1" title="Descrizione">
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product.description}
          />
        </AccordionItem>
      ) : null}
      {product.sku ? (
        <AccordionItem key="2" title="Specifiche">
          <span>SKU: {product.sku}</span>
        </AccordionItem>
      ) : null}
    </Accordion>
  );
}
