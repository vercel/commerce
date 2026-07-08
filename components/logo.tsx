import clsx from "clsx";
import Image from "next/image";
import logoBadge from "public/logo-512.png";

const SITE_NAME = process.env.SITE_NAME || "Lone Elk Coffee Company";

/**
 * The Lone Elk roundel, rasterized from `public/logo.svg` (the traced
 * 1.7 MB source stays in the repo as the editable original but is never
 * shipped to the client — regenerate the PNG from it if the mark changes).
 * The badge carries its own cream field and black rim, so one asset reads
 * on both the dark and light themes.
 */
export default function LogoBadge({
  size = 40,
  className,
  priority,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logoBadge}
      alt={`${SITE_NAME} badge`}
      width={size}
      height={Math.round((size * 516) / 512)}
      priority={priority}
      className={clsx("select-none", className)}
    />
  );
}
