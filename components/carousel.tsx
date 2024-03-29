import { getCollectionProducts } from 'lib/shopify';
import { GridTileImage } from './grid/tile';

const testimonials = [
  {
    name: 'Parent name',
    description:
      'Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.',
    school: 'Houston Quran Academy'
  },
  {
    name: 'Parent name',
    description:
      'Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.',
    school: 'Houston Quran Academy'
  },
  {
    name: 'Parent name',
    description:
      'Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.',
    school: 'ILM Academy'
  },
  {
    name: 'Parent name',
    description:
      'Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.',
    school: 'Iman Academy SE'
  },
  {
    name: 'Parent name',
    description:
      'Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.',
    school: 'Houston Quran Academy'
  },
  {
    name: 'Parent name',
    description:
      'Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.',
    school: 'Iman Academy SW'
  },
  {
    name: 'Parent name',
    description:
      'Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.',
    school: 'Ilm Academy'
  }
];

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {testimonials.map((product, i) => (
          <li
            key={`testimonial-${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <GridTileImage
              alt={product.name}
              label={{
                title: product.name,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
