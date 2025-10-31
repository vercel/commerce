'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import { addTransitionType, startTransition, useEffect } from 'react';

interface ViewTransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  viewTransitionType?: string;
}

export function ViewTransitionLink({
  href,
  children,
  className,
  onClick,
  prefetch = true,
  replace = false,
  scroll,
  viewTransitionType = 'navigation-forward'
}: ViewTransitionLinkProps) {
  const router = useRouter();

  useEffect(() => {
    if (!prefetch) return;
    router.prefetch?.(href);
  }, [href, prefetch, router]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    startTransition(() => {
      addTransitionType(viewTransitionType);

      if (replace) {
        router.replace(href, { scroll });
      } else {
        router.push(href, { scroll });
      }
    });
  };

  return (
    <a href={href} className={className} onClick={handleClick} role="link">
      {children}
    </a>
  );
}
