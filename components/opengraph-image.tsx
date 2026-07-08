import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME || "Lone Elk Coffee Company",
    },
    ...props,
  };

  const [fontFile, badgeFile] = await Promise.all([
    readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf")),
    readFile(join(process.cwd(), "./public/logo-512.png")),
  ]);
  const font = Uint8Array.from(fontFile).buffer;
  const badge = `data:image/png;base64,${badgeFile.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col items-center justify-center"
        style={{ backgroundColor: "#0c0c0a" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori requires plain img */}
        <img src={badge} width={220} height={222} alt="" />
        <p
          tw="mt-10 text-6xl font-bold"
          style={{
            color: "#e9e4d7",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {title}
        </p>
        <p
          tw="mt-6 text-2xl"
          style={{ color: "#8b9a5b", letterSpacing: "0.35em" }}
        >
          FRESH-ROASTED ON DEMAND
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
