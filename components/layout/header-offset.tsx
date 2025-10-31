'use client';

import { useEffect } from 'react';

export function HeaderOffset() {
  useEffect(() => {
    const updateHeaderOffset = () => {
      const header = document.getElementById('main-header');
      if (header) {
        const headerRect = header.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(header);
        const marginBottom = parseInt(computedStyle.marginBottom);
        const totalOffset = headerRect.height + marginBottom;
        
        document.documentElement.style.setProperty('--header-offset', `${totalOffset}px`);
      }
    };

    // Update on mount
    updateHeaderOffset();

    // Update on resize
    window.addEventListener('resize', updateHeaderOffset);

    return () => {
      window.removeEventListener('resize', updateHeaderOffset);
    };
  }, []);

  return null;
}

