import { PlusIcon } from '@heroicons/react/16/solid';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { CartItem } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';

type LineItemProps = {
  item: CartItem;
  closeCart: () => void;
};

type MerchandiseSearchParams = {
  [key: string]: string;
};

const CoreCharge = ({
  coreCharge,
  quantity
}: {
  coreCharge: CartItem['coreCharge'];
  quantity: number;
}) => {
  if (!coreCharge) return null;

  return (
    <div className="ml-20 mt-2 flex flex-row items-center">
      <PlusIcon className="mr-1.5 size-3" />
      <div className="flex flex-row items-center justify-start gap-2">
        {coreCharge.selectedOptions[0] ? (
          <Price
            className="text-xs font-medium"
            amount={coreCharge.selectedOptions[0].value}
            currencyCode="USD"
          />
        ) : (
          <span>Included</span>
        )}
        <span className="text-xs font-medium text-gray-700">{`x ${quantity}`}</span>
        <div className="ml-0.5 text-xs font-medium text-neutral-500">(Core Charge)</div>
      </div>
    </div>
  );
};
const LineItem = ({ item, closeCart }: LineItemProps) => {
  const merchandiseSearchParams = {} as MerchandiseSearchParams;

  item.merchandise.selectedOptions.forEach(({ name, value }) => {
    if (value !== DEFAULT_OPTION) {
      merchandiseSearchParams[name.toLowerCase()] = value;
    }
  });

  const merchandiseUrl = createUrl(
    `/product/${item.merchandise.product.handle}`,
    new URLSearchParams(merchandiseSearchParams)
  );

  return (
    <li className="flex w-full flex-col border-b border-neutral-300 pb-3">
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="absolute z-40 -mt-2 ml-[55px]">
          <DeleteItemButton item={item} />
        </div>
        <Link href={merchandiseUrl} onClick={closeCart} className="z-30 flex flex-row space-x-4">
          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <Image
              className="h-full w-full object-cover"
              width={64}
              height={64}
              alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
              src={item.merchandise.product.featuredImage.url}
            />
          </div>

          <div className="flex flex-1 flex-col gap-1 text-base">
            <span className="leading-tight">{item.merchandise.product.title}</span>
            {item.merchandise.title !== DEFAULT_OPTION ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {item.merchandise.title}
              </p>
            ) : null}
          </div>
        </Link>
      </div>
      <div className="ml-20 flex items-center justify-between gap-2">
        <Price
          className="font-semibold"
          amount={item.cost.totalAmount.amount}
          currencyCode={item.cost.totalAmount.currencyCode}
        />
        <div className="flex h-9 w-fit flex-row items-center rounded-sm border border-neutral-300 dark:border-neutral-700">
          <EditItemQuantityButton item={item} type="minus" />
          <p className="w-6 text-center">
            <span className="w-full text-sm">{item.quantity}</span>
          </p>
          <EditItemQuantityButton item={item} type="plus" />
        </div>
      </div>
      <CoreCharge coreCharge={item.coreCharge} quantity={item.quantity} />
    </li>
  );
};

export default LineItem;
