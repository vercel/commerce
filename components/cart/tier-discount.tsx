import Price from 'components/price';

type DiscountGroup = {
  discount: {
    amount: number;
    minimumSpent: number;
  };
};

export default function TierDiscount({ tieredDiscount }: { tieredDiscount: any }) {
  if (!tieredDiscount) {
    return;
  }

  const {
    discountGroups,
    discountAmount,
    spentToNextDiscount,
    minSpent,
    nextDiscount,
    subTotal,
    currencyCode
  } = tieredDiscount;

  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-between gap-2 border-b border-neutral-200 pb-4 md:mt-4 dark:border-neutral-700">
        <div className="flex gap-2">
          {spentToNextDiscount > 0 && (
            <>
              Spent more than
              <Price
                className="text-right text-base text-black dark:text-white"
                amount={JSON.stringify(spentToNextDiscount)}
                currencyCode={currencyCode}
              />
            </>
          )}
          {nextDiscount && <span>to get {nextDiscount * 100}%</span>}
        </div>
        <div className="relative h-2.5 w-full  overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2.5 rounded-full bg-blue-600"
            style={{ width: `${(subTotal / minSpent) * 100}%` }}
          />
          {discountGroups.map((group: DiscountGroup, i: number) => (
            <div
              key={i}
              className={`absolute top-0 h-2.5 rounded-full bg-blue-${
                i === 0 ? 400 : 200
              } dark:bg-blue-${i === 0 ? 400 : 700}`}
              style={{ width: `${(group.discount.minimumSpent / minSpent) * 100}%` }}
            />
          ))}
        </div>
        <p className="text-base text-black dark:text-white">
          {spentToNextDiscount === 0 ? (
            <span>Congratulations you got {discountAmount}% Discounts!</span>
          ) : (
            <span>You got : {discountAmount}% off</span>
          )}
        </p>
      </div>
    </>
  );
}
