import { SCAPE } from 'constants/brand';
import { productTypes } from 'constants/item-details';
import { credentials, credentialsKeys } from 'constants/sustainability';
import { Product } from 'lib/shopify/types';

export function DescriptionContent({ product }: { product: Product }) {
  const productTypeKeys = Object.keys(productTypes);
  const checkProductType = () => {
    return product.tags.find(tag => productTypeKeys.includes(tag));
  }
  const productType = checkProductType() as keyof typeof productTypes & string;

  const getCertificationId = (toFind: string) => credentialsKeys.find(key => key === toFind);

  if (!productType) {
    return null;
  }
  
  const itemDetails = productTypes[productType];

  if (!itemDetails) {
    return null;
  }

  const certificationLink = (credType: keyof typeof credentials) => {
    return <a className='text-underline text-xs' href={`#${getCertificationId(credType)}`}> {credentials[credType].title} certified</a>
  }

  const commonDetailKeys = Object.keys(itemDetails.common)

  return (
    <>
      <div className="mt-6">
        <h4 className='text-lg'>{product.title}, an exclusive artwork by {SCAPE}</h4>
        <div>
          <p className='font-bold mt-6'>Details:</p>
          <ul className='list-disc list-inside'>
            <li className='mt-2'>
              {itemDetails.content}* -
              {certificationLink('gots')}
            </li>
            <li className='mt-1'>
              {itemDetails.print} - 
              {certificationLink('oekoEco')}
            </li>
            <li className='mt-1'>{itemDetails.weight.feel} weight, {itemDetails.weight.gsm} GSM</li>
            {commonDetailKeys.map(detail => (

              // <div>{detail}</div>
              <li key={detail} className="mt-1">
                {itemDetails.common[detail as keyof typeof itemDetails.common]}
              </li>
            ))}

            <p className='mt-4 text-xs'>
              * Yes you read that right, 100%, this includes our brand label.
            </p>
          </ul>
        </div>
      </div>
    </>
  )
};
