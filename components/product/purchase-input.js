'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Option, Select, NumberInput } from '/components/input.js';
import {
    productAvailableForSale,
    productHasOptions,
    productIsForSale,
    VariantPrice,
} from '/components/price.js';

export const productVariant = ({ product, selectedOptions }) => {
    const hasOptions = productHasOptions(product);

    if (hasOptions) {
        const optionNames =
            product?.options?.map(option => option?.name ?? '') ?? [];

        console.log({
            product: product?.handle,
            optionNames,
            variants: product?.variants,
        });

        for (const variant of product?.variants ?? []) {
            let matching = true;

            console.log({ variantTitle: variant?.title });

            for (const option of variant?.selectedOptions) {
                const optionName = option?.name ?? '';
                const optionValue = option?.value ?? '';

                console.log({ optionName, optionValue, optionNames });

                for (let i = 0; i < optionNames?.length; i++) {
                    if (optionName == optionNames[i]) {
                        console.log({
                            optionName,
                            optionValue,
                            selectedOption: selectedOptions[i],
                        });

                        if (optionValue != selectedOptions[i]) {
                            matching = false;
                        }
                    }
                }
            }

            if (matching) {
                return variant;
            }
        }
    }
};

export default function PurchaseInput({ product }) {
    const hasOptions = productHasOptions(product);
    const isForSale = productIsForSale(product);
    const availableForSale = productAvailableForSale(product);

    const [qty, setQty] = useState(1);

    const [selectedOptions, setSelectedOptions] = useState(
        product?.options?.map(option => option?.values?.[0] ?? '') ?? []
    );

    const variant = hasOptions
        ? productVariant({ product, selectedOptions })
        : product?.variants?.[0];

    console.log({ variant });

    return availableForSale ? (
        isForSale && (
            <>
                <NumberInput
                    min='1'
                    value={qty}
                    id='quantity'
                    label='Qty'
                    onChange={e => setQty(e.target.value)}
                />
                <>
                    {hasOptions &&
                        product?.options?.map((option, i) => (
                            <Select
                                key={option?.id}
                                id={option?.name}
                                label={option?.name}
                                value={selectedOptions[i]}
                                onChange={e =>
                                    setSelectedOptions(
                                        selectedOptions.map((value, ii) =>
                                            i == ii ? e.target.value : value
                                        )
                                    )
                                }
                            >
                                {option?.values?.map(value => (
                                    <Option key={value} value={value}>
                                        {value}
                                    </Option>
                                ))}
                            </Select>
                        ))}
                </>
                <VariantPrice variant={variant} quantity={qty} />
                {/* TODO: add to cart on click */}
                <button type='button'>Buy Now!</button>
                <Link href='/checkout'>Checkout?</Link>
            </>
        )
    ) : (
        <p>Sold Out</p>
    );
}
