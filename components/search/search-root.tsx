import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

const searchClient = algoliasearch(
  `${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`,
  `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY}`
);

interface SearchRootProps {
  children: JSX.Element | JSX.Element[];
}

export default function SearchRoot({ children }: SearchRootProps) {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="shopify_products">
        {children}
      </InstantSearch>
    </>
  );
}
