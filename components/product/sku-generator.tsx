'use client'

import { createProductSKUs } from "lib/helpers/skus";


export function ProductSKUs(productInfo: {productTitle: string}) {
  const SKUs = createProductSKUs(productInfo.productTitle)

  function copyText(e) {
    navigator.clipboard.writeText(e.target.value);
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-8 px-4 dark:border-neutral-800 dark:bg-black md:p-12 lg:grid lg:grid-cols-6">
          <div className="lg:col-span-3">
            {SKUs?.map(SKU => {
              return (
                <div className="my-4 w-full">
                  <input type="text" value={SKU} onClick={copyText} className="cursor-pointer w-full border py-2 px-2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
};
