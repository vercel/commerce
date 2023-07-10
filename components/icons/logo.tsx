import clsx from 'clsx';

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 32 32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      className={clsx('h-4 w-4', className)}
    >
      <path
        className=" fill-black dark:fill-white"
        d="M19.1999 7.59974L16 2L0 30H6.32501L19.1999 7.59974ZM23.2351 14.6614L20.035 20.3476L22.3566 24.4108H17.7482L14.6025 30H32L23.2351 14.6614Z"
      />
    </svg>
  );
}
