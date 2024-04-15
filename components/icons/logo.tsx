import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 73 76"
      aria-label={`${process.env.SITE_NAME} logo`}
      {...props}
      className={clsx('h-4 w-4 fill-black dark:fill-white', props.className)}
    >
      <path
        d="M0 50.0762L25.3734 38.7832L39.9779 47.253L42.9283 75.0399L24.9309 74.8909L27.5862 55.5739L24.4883 53.7909L9.2937 65.6789L0 50.0762Z"
        fill="#17E4BB"
      />
      <path
        d="M41.6014 46.0633L64.0248 62.5569L72.8758 46.6577L54.8778 39.3766V35.8104L72.8758 28.3807L64.0248 12.6298L41.6014 29.1237V46.0633Z"
        fill="#17E4BB"
      />
      <path
        d="M39.9779 27.7869L42.9283 0L24.9309 0.2971L27.5862 19.6143L24.4883 21.3974L9.1462 9.5099L0 24.9636L25.3734 36.2567L39.9779 27.7869Z"
        fill="#17E4BB"
      />
    </svg>
  );
}
