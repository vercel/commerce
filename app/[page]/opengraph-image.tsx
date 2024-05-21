import OpengraphImage from 'components/opengraph-image';

export const runtime = 'edge';

export default async function Image({}: { params: { page: string } }) {
  const title = process.env.SITE_NAME;

  return await OpengraphImage({ title });
}
