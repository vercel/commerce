import { ImageResponse } from "next/og";
import LogoIcon from "./icons/logo";
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

  const file = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col items-center justify-center"
        style={{ backgroundColor: "#0c0c0a" }}
      >
        <div
          tw="flex flex-none items-center justify-center h-[160px] w-[160px]"
          style={{
            border: "1px solid #2b2b22",
            backgroundColor: "#191913",
            color: "#8b9a5b",
          }}
        >
          <LogoIcon width="88" height="88" />
        </div>
        <p
          tw="mt-12 text-6xl font-bold"
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
