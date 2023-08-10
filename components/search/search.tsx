import algoliasearch from 'algoliasearch/lite';
import { Highlight, Hits, InstantSearch, SearchBox } from 'react-instantsearch';

const searchClient = algoliasearch(
  `${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`,
  `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY}`
);

export default function Search() {
  // Hit.
  function Hit(props: any) {
    return (
      <li>
        <a href={`/product/${props.hit.handle}`} className="flex gap-4">
          <div className="relative aspect-square h-16 w-16 bg-neutral-300" />
          <div>
            <h3 className="mt-2 flex text-lg font-bold text-gray-900">
              <Highlight attribute="title" hit={props.hit} />
            </h3>
            <p className="text-gray-700">{props.hit.price} SEK</p>
          </div>
        </a>
      </li>
    );
  }
  return (
    <div className="flex flex-col overflow-auto">
      <InstantSearch searchClient={searchClient} indexName="shopify_products">
        {/* Widgets */}
        <SearchBox
          placeholder="Vad letar du efter?"
          classNames={{
            root: 'mt-4',
            form: 'relative',
            input:
              'block w-full appearance-none rounded-none h-11 pl-9 pr-3 py-2 bg-white border border-ui-border',
            submit: 'absolute flex items-center justify-center top-0 left-0 bottom-0 w-11 h-11',
            submitIcon: 'w-4 h-4'
          }}
        />

        <Hits
          classNames={{
            root: 'flex flex-col mt-4',
            list: 'grid grid-cols-1 gap-4'
          }}
          hitComponent={Hit}
        />
      </InstantSearch>
    </div>
  );
}
