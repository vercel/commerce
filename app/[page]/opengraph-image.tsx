import OpengraphImage from 'components/opengraph-image';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const title = '';

  return await OpengraphImage({ title });
}
