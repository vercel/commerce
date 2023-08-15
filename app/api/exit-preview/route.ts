import { draftMode } from "next/headers";

export async function GET() {
  draftMode().disable();
  
  return new Response(null, {
    status: 307,
    headers: {
        Location: `/`,
    },
  })
}