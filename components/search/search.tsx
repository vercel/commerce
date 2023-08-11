import algoliasearch from 'algoliasearch/lite';
// import { useLocale } from 'next-intl';
import Text from '@/components/ui/text';
import { Highlight, Hits, InstantSearch, SearchBox } from 'react-instantsearch';

const searchClient = algoliasearch(
  `${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`,
  `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY}`
);

export default function Search() {
  // const locale = useLocale();
  // Hit.
  function Hit(props: any) {
    return (
      <li>
        <a href={`/product/${props.hit.handle}`} className="flex gap-4">
          <div className="relative aspect-square h-16 w-16 bg-neutral-300" />
          <div>
            <Text className="!text-sm text-low-contrast" variant="label">
              Brand
            </Text>
            <h3 className="flex text-sm font-bold text-high-contrast">
              <Highlight attribute="title" hit={props.hit} />
            </h3>
            <p className="text-sm font-bold ">{props.hit.price} SEK</p>
          </div>
        </a>
      </li>
    );
  }
  return (
    <div className="flex flex-col">
      <InstantSearch searchClient={searchClient} indexName="shopify_products">
        {/* Widgets */}
        <SearchBox
          placeholder="Vad letar du efter?"
          classNames={{
            root: 'mt-4',
            form: 'relative',
            input:
              'block w-full outline-offset-0 appearance-none rounded-none h-11 px-11 pr-3 py-2 bg-white border border-ui-border',
            submit: 'absolute flex items-center justify-center top-0 left-0 bottom-0 w-11 h-11',
            submitIcon: 'w-4 h-4',
            reset: 'absolute items-center justify-center top-0 right-0 bottom-0 w-11 h-11',
            resetIcon: 'w-3 h-3 mx-auto bg-app'
          }}
        />

        {/* <Configure filters={`locale:${locale}`} /> */}

        <Hits
          classNames={{
            root: 'flex flex-col mt-4 overflow-auto max-h-full',
            list: 'grid grid-cols-1 gap-12 overflow-auto'
          }}
          hitComponent={Hit}
        />
      </InstantSearch>
    </div>
  );
}
