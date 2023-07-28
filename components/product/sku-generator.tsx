'use client'

import clsx from "clsx";
import { createProductSKUs } from "lib/helpers/skus";
import { useState } from "react";


export function ProductSKUs(productInfo: {productTitle: string}) {
  const SKUs = createProductSKUs(productInfo.productTitle)
  const [copyMessageState, setCopyMessageState] = useState< number | null >(null);
  
  const triggerCopyMessage = async (e: MouseEvent<HTMLButtonElement>, i: number) => {
    copyText(e.target.value)
    
    console.log("copyMessageState", copyMessageState);
    setCopyMessageState(i);
    console.log("copyMessageState", copyMessageState);
    
    setTimeout(() => setCopyMessageState(null), 2500)
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-8 px-4 dark:border-neutral-800 dark:bg-black md:p-12 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-4">
            <h3 className="font-bold text-xl pb-4">{productInfo.productTitle}</h3>
            {/* {copyMessageState} */}
            {SKUs?.map((SKU, index) => {
              return (
                <div className="my-4 w-full" key={`${SKU}-${index}`}>
                  <div 
                  onClick={(e) => triggerCopyMessage(e, index)} 
                  className={clsx(
                    [
                      "cursor-pointer w-full border py-2 px-2 rounded",
                      { 'border-green-500': (copyMessageState === index) },
                    ]
                  )}
                  >
                    {SKU}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
};
