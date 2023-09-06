'use client';

import { FunctionComponent, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

type GoogleLayerProps = {
  isShowing: boolean;
  /* eslint-disable-next-line no-undef */
  children: JSX.Element | JSX.Element[] | string;
};

export function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

export function logEvent(action: any, category: any, label: any) {
  ReactGA.event({ action, category, label });
}

export const GoogleProvider: FunctionComponent<GoogleLayerProps> = ({ isShowing, children }) => {
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeComplete = async () => {
      logPageView();
    };

    if (isShowing) {
      if (process.env.NEXT_PUBLIC_GA_UA_ID) {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_UA_ID, {
          debug: false
        });
        //* Record current pageview following initialization
        onRouteChangeComplete();
        //* Record a pageview when route changes
        router.events.on('routeChangeComplete', onRouteChangeComplete);
      }
      if (process.env.NEXT_PUBLIC_GTM_ID) {
        TagManager.initialize({
          gtmId: process.env.NEXT_PUBLIC_GTM_ID
        });
      }
    }
    //* Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [isShowing, router]);

  return <>{children}</>;
};
