// make a page where you can select from garment types, collection types and numbers to create a copyable name
"use client"

import { Input } from "@/components/ui/input";
import { Combox } from "components/combox";
import { ProductSKUs } from "components/product/sku-generator";
import { collectionsSKUs, garmentHandleKeys } from "constants/sku";
import { capitalizeFirstLetter, copyText } from "lib/helpers/actions";
import { useEffect, useState } from "react";

// type SKUSelectorState = {
//   garment?: keyof typeof garmentHandleKeys,
//   collection?: keyof typeof collectionsSKUs,
// };

export default async function NewProductHelpPage() {
  // const [open, setOpen] = useState(false)
  const [collection, setCollection] = useState<keyof typeof collectionsSKUs | null>(null)
  const [garment, setGarment] = useState<keyof typeof garmentHandleKeys | null>(null)
  const [title, setTitle] = useState<string | null>(null)
  const [number, setNumber] = useState<string | null>(null)

  useEffect(() => {
    const title = createTitle()
    console.log("🍓🍋🍊 title", title);
    
  }, [collection, garment])
  
  const garmentValues = Object.keys(garmentHandleKeys)
  const collectionValues = Object.keys(collectionsSKUs)
  
  const optionsMapper = (keys: {}, values: string[]) => {
    return values.map(value => {
      return {
        key: keys[value as keyof typeof keys],
        label: value,
      }
    })
  }
  
  const garmentOptions = optionsMapper(garmentHandleKeys, garmentValues);
  const collectionOptions = optionsMapper(collectionsSKUs, collectionValues);

  const createTitle = () => {
    setTitle(collection && garment && `${capitalizeFirstLetter(collection)}scape No.${number} ${garment}`)
  }

  

  return (
      <div className="m-20">
        <div className="grid grid-cols-5">
          <div className="py-6 col-span-4 col-start-2">
            <p className="title">New Product Creator</p>
          </div>
          <div className="py-6 col-span-1 col-start-2">
            <Combox 
            options={collectionOptions} 
            onShow={(key: string): void => setCollection(key as keyof typeof collectionsSKUs)} 
            currentKey={collection || null}
            />
          </div>
          <div className="pt-6 mx-30 col-span-1 col-start-3 flex justify-center items-start">
            <Input 
            className="w-2/3" 
            type="number" 
            placeholder="No."
            onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="pt-6 col-span-1 col-start-4">
            <Combox 
            options={garmentOptions}
            onShow={(key: string): void => setGarment(key as keyof typeof garmentHandleKeys)} 
            currentKey={garment || null}
            />
          </div>

          {garment && collection && number && title &&
            <>
              <div className="pb-6 col-span-3 col-start-2">
                <div
                  className="border p-2 px-4 cursor-pointer"
                  onClick={() => copyText(title)}
                >
                  {title}
                </div>
              </div>
              <div className="my-5 col-span-5">
                <ProductSKUs productTitle={title} noTitle={true} />
              </div>
            </>
          }
        </div>
      </div>
  )
}