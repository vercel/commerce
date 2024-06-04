'use client';

import { useEffect, useRef } from 'react';

const TrustPilot = () => {
  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    if (window.Trustpilot) {
      // @ts-ignore
      window.Trustpilot.loadFromElement(ref.current);
    }
  }, []);

  return (
    <div
      ref={ref}
      data-locale="en-US"
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="58af38df0000ff00059d3de2"
      data-style-height="120px"
      data-style-width="100%"
      data-style-font-size="10px"
      data-theme="dark"
    >
      <a href="https://www.trustpilot.com/review/carpartplanet.com" target="_blank" rel="noopener">
        Trustpilot
      </a>
    </div>
  );
};

export default TrustPilot;
