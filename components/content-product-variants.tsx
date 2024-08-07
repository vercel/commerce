import { ProductVariant } from 'lib/shopify/types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function ImageVariantSelector({
  variants,
  selectedVariant,
  currentProductPath
}: {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  currentProductPath: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="truncate text-base text-black">
        <span className="font-semibold">Color</span>: {selectedVariant.title}
      </div>
      <div className="-mx-1 flex flex-row flex-wrap gap-1">
        {variants.map((variant) => (
          <a
            key={variant.id}
            className={classNames(
              variant.id === selectedVariant.id ? 'border-neutral-500' : 'bg-neutral-200',
              'size-11 rounded-full border-2  bg-cover bg-clip-content p-0.5 text-neutral-700 transition-colors hover:border-neutral-400'
            )}
            style={{
              backgroundImage: `url(${variant.image?.url})`
            }}
            data-discover="true"
            href={`${currentProductPath}?v=${variant.id}`}
          >
            <div className="sr-only">{variant.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function TitleVariantSelector({
  variants,
  selectedVariant,
  currentProductPath
}: {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  currentProductPath: string;
}) {
  if (variants.length < 2) return null;
  return (
    <div className="flex flex-col gap-2">
      {/*
      <div className="max-w-[400px] truncate text-base text-black">
        <span className="font-semibold">Bundle</span>: The Shore Thing Chair with Sun Shade and
        Drink Holder
      </div>*/}
      <div className="-mx-1 flex flex-wrap gap-1">
        {variants.map((variant) => {
          const variantId = variant.id.split('/').at(-1);
          return (
            <a
              key={variant.id}
              className={classNames(
                variant.id === selectedVariant.id ? 'border-neutral-500 bg-neutral-200' : '',
                'flex min-w-11 justify-center rounded-lg border-2 bg-clip-content p-0.5 text-sm text-neutral-700 transition-colors hover:border-neutral-400 aria-disabled:pointer-events-none aria-disabled:opacity-40'
              )}
              data-discover="true"
              href={`${currentProductPath}/${variantId}`}
            >
              <div className="rounded p-2">{variant.title}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function VariantSelector({
  variants,
  selectedVariant,
  currentProductPath
}: {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  currentProductPath: string;
}) {
  return (
    <>
      <ImageVariantSelector
        variants={variants}
        selectedVariant={selectedVariant}
        currentProductPath={currentProductPath}
      />
      <TitleVariantSelector
        variants={variants}
        selectedVariant={selectedVariant}
        currentProductPath={currentProductPath}
      />
    </>
  );
}
