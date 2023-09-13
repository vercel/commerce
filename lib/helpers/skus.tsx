import { collectionsSKUs, colorSKUs, customisationSKUs, garmentHandleKeys, garmentSKUs, garmentSizes, sizeSKUs } from "constants/sku";

type TitleInfo = Awaited<ReturnType<typeof extractInfoFromTitle>>;

const garmentHandleKeyMapper = (garmentKeys: string[]) => {
  const garmentTitle = garmentKeys.join(' ');
  const garmentKey = garmentHandleKeys[garmentTitle as keyof typeof garmentHandleKeys]
  return garmentSKUs[garmentKey as keyof typeof garmentSKUs]
}

const extractInfoFromTitle = (productTitle: string) => {
  const title = productTitle.split(' ');
  const collection = title[0]?.toLowerCase();
  const garmentKeys = title.slice(2)
  return {
    title,
    collection,
    garmentTitle: garmentKeys.join(' '),
    artworkNumber: title[1]?.replace('No.', ''),
    garmentKeys,
    collectionKey: collection!.replace('scape', ''),
  }
}

const collectionSKUMapper = (titleInfo: TitleInfo) => {
  const collectionSKU = collectionsSKUs[titleInfo.collectionKey as keyof typeof collectionsSKUs];
  const artworkSKU = titleInfo.artworkNumber!.padStart(4, "0");
  const garmentSKU = garmentHandleKeyMapper(titleInfo.garmentKeys);
  
  return `SCSQ${collectionSKU}${artworkSKU}_${garmentSKU}`;
}

const customisationSKUMapper = () => 
  `${colorSKUs.black}_${customisationSKUs.printArea}_${customisationSKUs.tags}`

export const createProductSKUs = (productTitle: string) => {
  const titleInfo = extractInfoFromTitle(productTitle);
  const garmentKey = garmentHandleKeys[titleInfo.garmentTitle as keyof typeof garmentHandleKeys]
  const getGarmentSizes = garmentSizes[garmentKey]
  const customisationSKUs = customisationSKUMapper();

  return getGarmentSizes?.map(size => {
    const currentSizeSKU = sizeSKUs[size as keyof typeof sizeSKUs]
    const collectionSKU = collectionSKUMapper(titleInfo)
    
    return `${collectionSKU}_${currentSizeSKU}_${customisationSKUs}`
  })
}
