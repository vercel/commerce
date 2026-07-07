import clsx from "clsx";
import LogoIcon from "./icons/logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center border border-seam bg-coal text-bone",
        {
          "h-[40px] w-[40px]": !size,
          "h-[30px] w-[30px]": size === "sm",
        },
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[22px] w-[22px]": !size,
          "h-[16px] w-[16px]": size === "sm",
        })}
      />
    </div>
  );
}
