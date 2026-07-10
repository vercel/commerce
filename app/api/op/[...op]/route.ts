import { createRouteHandler } from "@openpanel/nextjs/server";

export const { GET, POST } = createRouteHandler({
  apiUrl:
    process.env.NEXT_PUBLIC_OPENPANEL_API_URL ||
    "https://scout-02.tail27b972.ts.net/api",
});
