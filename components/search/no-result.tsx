'use client';

import { ReactNode } from 'react';
import { ClearRefinements, useInstantSearch } from 'react-instantsearch';

import { useTranslations } from 'next-intl';

interface NoResultsProps {
  children: ReactNode;
  fallback: ReactNode;
}

export function NoResultsBoundary({ children, fallback }: NoResultsProps) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

export function NoResults() {
  const t = useTranslations('search');
  const { indexUiState } = useInstantSearch();

  return (
    <div>
      <p className="mt-4">
        {t('noResults')} <q>{indexUiState.query}</q>.
        <ClearRefinements
          translations={{
            resetButtonText: t('resetTitle')
          }}
          classNames={{
            button: 'border border-ui-border px-6 py-3 mt-4 inline-flex mx-auto w-auto'
          }}
          excludedAttributes={[]}
        />
      </p>
    </div>
  );
}
