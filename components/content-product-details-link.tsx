import { Store } from 'lib/aspire/types';

export default function MoreDetailsLink({ store }: { store: Store }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="prose text-sm/relaxed">{}</div>
      <a
        rel="noreferrer"
        target="_blank"
        href={store.domain}
        className="group/link inline-flex items-center gap-x-1 text-neutral-700"
      >
        <span className="underline decoration-neutral-700/50 decoration-2 underline-offset-4 group-hover/link:decoration-neutral-700">
          More details on {store.name}
        </span>
        <svg aria-hidden="true" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}
