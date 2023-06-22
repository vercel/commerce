'use client';

import { Option, Select, NumberInput } from '/components/input.js';

export default function PurchaseInput({ product }) {
    const hasOptions = product?.options?.[0]?.values.length > 1 ?? false;
    //TODO: turn these checks into shared functions
    // const onSale =
    //     (compareAtPriceRange?.minVariantPrice?.amount ?? 0) >
    //         (priceRange?.minVariantPrice?.amount ?? 0) ||
    //     (compareAtPriceRange?.maxVariantPrice?.amount ?? 0) >
    //         (priceRange?.maxVariantPrice?.amount ?? 0);
    const isForSale = (product?.priceRange?.maxVariantPrice?.amount ?? 0) > 0;

    return (
        product?.availableForSale &&
        isForSale && (
            <>
                <NumberInput min='1' value='1' id='quantity' label='Qty' />
                <>
                    {hasOptions &&
                        product?.options?.map(option => (
                            <Select
                                key={option?.id}
                                id={option?.name}
                                label={option?.name}
                            >
                                {option?.values?.map((value, i) => (
                                    <Option
                                        key={value}
                                        value={value}
                                        selected={i == 0}
                                    >
                                        {value}
                                    </Option>
                                ))}
                            </Select>
                        ))}
                </>
            </>
        )
    );
}
