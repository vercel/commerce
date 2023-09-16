'use client';

import { useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { Option, Select, NumberInput } from '/components/input';
import {
    productAvailableForSale,
    productHasOptions,
    productIsForSale,
    VariantPrice,
} from '/components/price';

export const productVariant = ({ product, selectedOptions }) => {
    const hasOptions = productHasOptions(product);

    if (hasOptions) {
        const optionNames =
            product?.options?.map(option => option?.name ?? '') ?? [];

        for (const variant of product?.variants ?? []) {
            let matching = true;

            for (const option of variant?.selectedOptions) {
                const optionName = option?.name ?? '';
                const optionValue = option?.value ?? '';

                for (let i = 0; i < optionNames?.length; i++) {
                    if (optionName == optionNames[i]) {
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

// TODO: check availability against stock ?
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

    return (
        <div className={styles.purchaseInput}>
            {isForSale && (
                <div className={styles.topBottom}>
                    <div>
                        {availableForSale && (
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
                                                        selectedOptions.map(
                                                            (value, ii) =>
                                                                i == ii
                                                                    ? e.target
                                                                          .value
                                                                    : value
                                                        )
                                                    )
                                                }
                                            >
                                                {option?.values?.map(value => (
                                                    <Option
                                                        key={value}
                                                        value={value}
                                                    >
                                                        {value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        ))}
                                </>
                            </>
                        )}
                    </div>
                    <div>
                        <VariantPrice variant={variant} quantity={qty} />
                        <div className={styles.ctas}>
                            {/* TODO: add to cart on click */}
                            <button
                                className={`${styles.buyNow} ${
                                    !availableForSale && styles.inactive
                                }`}
                                type='button'
                            >
                                Buy Now!
                            </button>
                            <Link href='/checkout' className={styles.checkout}>
                                Checkout?
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
