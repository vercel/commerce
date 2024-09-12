import { clsx } from 'clsx';
import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

export default function ProductGridItems({
  src,
  title,
  handle,
  ratio
}: {
  src: string;
  title: string;
  handle: string;
  ratio?: '2/3' | 'square';
}) {
  return (
    <Grid.Item
      key={handle}
      className={clsx('relative w-full', ratio === '2/3' ? `aspect-[2/3]` : 'aspect-square')}
    >
      <Link className="h-full w-full" href={`/product/${handle}`} prefetch={true}>
        <GridTileImage alt={title} title={title} src={src} fill />
      </Link>
    </Grid.Item>
  );
}
