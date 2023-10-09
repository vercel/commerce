import OpengraphImage from 'components/opengraph-image';

export const runtime = 'edge';
export const revalidate = 300; // 5 minutes in seconds

export default async function Image() {
  return await OpengraphImage();
}
