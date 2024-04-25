"use client"

import { Input } from "@/components/ui/input";
import { ProductSKUs } from "components/product/sku-generator";
import { Combox } from "components/ui/combox";
import { collectionsSKUs, garmentHandleKeys } from "constants/sku";
import { capitalizeFirstLetter, copyText } from "lib/helpers/actions";
import { useMemo, useState } from "react";



// type SKUSelectorState = {
//   garment?: keyof typeof garmentHandleKeys,
//   collection?: keyof typeof collectionsSKUs,
// };

export function NewProductHelpComponent() {
  // const [open, setOpen] = useState(false)
  const [collection, setCollection] = useState<keyof typeof collectionsSKUs | null>(null);
  // TODO: preselect tshirt
  const [garment, setGarment] = useState<keyof typeof garmentHandleKeys | null>(null);
  // const [title, setTitle] = useState<string | null>(null);
  const [number, setNumber] = useState<string | null>(null);

  const title = useMemo(() => {
    const title = collection && garment && `${capitalizeFirstLetter(collection)}scape No.${number} ${garment}`;
    console.log("🍓🍋🍊 title", title);
    return title;
  }, [collection, garment, number]);

  const garmentOptions = Object.entries(garmentHandleKeys).map(([fullGarmentName, garmentHandle]) => ({
    label: fullGarmentName as keyof typeof garmentHandleKeys,
    key: fullGarmentName as keyof typeof garmentHandleKeys,
  }))
  const collectionOptions = Object.entries(collectionsSKUs).map(([scape, scapeNumber]) => ({
    label: scape as keyof typeof collectionsSKUs,
    key: scape as keyof typeof collectionsSKUs
  }))

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
            currentKey={collection || null} />
        </div>
        <div className="pt-6 mx-30 col-span-1 col-start-3 flex justify-center items-start">
          <Input
            className="w-2/3"
            type="number"
            placeholder="No."
            onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className="pt-6 col-span-1 col-start-4">
          <Combox
            options={garmentOptions}
            onShow={(key: string): void => setGarment(key as keyof typeof garmentHandleKeys)}
            currentKey={garment || null} />
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
          </>}
      </div>
    </div>
  );
}
