import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex items-center border border-seam bg-night/80 p-1 text-xs font-semibold text-bone backdrop-blur-md">
        <h3 className="font-display mr-4 line-clamp-2 grow pl-2 leading-none tracking-[0.1em] uppercase">
          {title}
        </h3>
        <Price
          className="flex-none bg-field p-2 font-mono text-night"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
