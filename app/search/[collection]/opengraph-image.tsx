import { getCollections } from "lib/store/products";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({
  params,
}: {
  params: { collection: string };
}) {
  const collections = await getCollections();
  const collection = collections.find((c) => c.handle === params.collection);
  const title = collection?.title || "Collection Not Found";

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            textAlign: "center",
            color: "black",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
