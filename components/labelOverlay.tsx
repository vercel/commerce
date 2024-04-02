import clsx from 'clsx';
import Price from './price';

const LabelOverlay = ({
  title,
  amount,
  currencyCode,
  position = 'bottom',
  available
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
  available?: boolean;
}) => {
  return (
    <div
      className={clsx(
        'absolute bottom-20 left-0 z-20 flex w-full flex-col items-center justify-center @container/label'
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-center text-5xl tracking-tight">{title}</h3>
      {available ? (
        <Price
          className="flex-none bg-black p-2 text-xl tracking-wide text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      ) : (
        <>
          <span className="bg-black p-2 text-lg text-white">Sold Out</span>
        </>
      )}
    </div>
  );
};

export default LabelOverlay;
