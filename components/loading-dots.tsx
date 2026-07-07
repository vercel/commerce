import clsx from "clsx";

const dots = "mx-[1px] inline-block h-1 w-1 animate-blink";

const LoadingDots = ({ className }: { className: string }) => {
  return (
    <span className="mx-2 inline-flex items-center">
      <span className={clsx(dots, className)} />
      <span
        className={clsx(dots, className)}
        style={{ animationDelay: "200ms" }}
      />
      <span
        className={clsx(dots, className)}
        style={{ animationDelay: "400ms" }}
      />
    </span>
  );
};

export default LoadingDots;
