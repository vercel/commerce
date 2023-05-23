import { NextApiRequest, NextApiResponse } from 'next';

import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const SANITY_WEBHOOK_SECRET = `${process.env.SANITY_WEBHOOK_SECRET}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const signature = `${req.headers[SIGNATURE_HEADER_NAME]}`;
  const isValid = isValidSignature(JSON.stringify(req.body), signature, SANITY_WEBHOOK_SECRET);

  console.log(`===== Is the webhook request valid? ${isValid}`);

  // Validate signature
  if (!isValid) {
    res.status(401).json({ success: false, message: 'Invalid signature' });
    return;
  }

  const slug = req.body.slug;
  const locale = req.body.locale;
  const type = req.body._type;
  let pathToRevalidate = "";

  switch(type) {
    case "home":
        pathToRevalidate = `${slug}${locale}`;
      break;
    default:
      break;
  }

  console.log(`Path to revalidate: ${pathToRevalidate}`)

  try {
    await res.revalidate(`${pathToRevalidate}`);

    return res.json({ revalidated: true });
  } catch (err) {
    // Could not revalidate. The stale page will continue to be shown until
    // this issue is fixed.
    return res.status(500).send('Error while revalidating');
  }
}
