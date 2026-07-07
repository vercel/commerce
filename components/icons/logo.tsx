import clsx from "clsx";

/**
 * Lone Elk antler mark — symmetric rack drawn with squared strokes,
 * inherits `currentColor`.
 */
export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME || "Lone Elk Coffee Company"} logo`}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="square"
      {...props}
      className={clsx("h-4 w-4", props.className)}
    >
      {/* neck */}
      <path d="M16 28v-8" />
      {/* left beam + tines */}
      <path d="M16 20l-5.5-4-1-7" />
      <path d="M10.5 16 5 14.5" />
      <path d="M10 12.5 5.5 9.5" />
      <path d="M9.5 9 7 4" />
      <path d="M9.5 9l3.5-3.5" />
      {/* right beam + tines */}
      <path d="M16 20l5.5-4 1-7" />
      <path d="M21.5 16l5.5-1.5" />
      <path d="M22 12.5l4.5-3" />
      <path d="M22.5 9 25 4" />
      <path d="M22.5 9 19 5.5" />
    </svg>
  );
}
