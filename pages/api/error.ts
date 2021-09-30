import type { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs";
import * as Sentry from '@sentry/nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('try api')
    throw new Error("API throw error test")
    res.status(200).json({ name: "John Doe" });
  }
  catch (ex) {
    console.log('caught exception')
    Sentry.captureException(ex)
    res.status(500).json({ error: "cannot complete request"});
  }
};

export default withSentry(handler);