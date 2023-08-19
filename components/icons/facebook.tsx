import clsx from 'clsx';

export default function FacebookIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 11 22"
      stroke="none"
      className={clsx(props?.className)}
    >
      <path d="M7.084 21.8459V12.2629H10.3L10.782 8.52788H7.082V6.14588C7.082 5.06188 7.382 4.32988 8.937 4.32988H10.912V0.993885C9.95478 0.891711 8.99265 0.842303 8.03 0.845885C5.174 0.845885 3.23 2.58788 3.23 5.77588V8.52888H0V12.2639H3.227V21.8459H7.084Z" />
    </svg>
  );
}
