import Image from 'next/image';

export function GridTileImage({
  title,
  ...props
}: {
  title?: string;
} & React.ComponentProps<typeof Image>) {
  return (
    <>
      {props.src ? <Image fill className="h-full w-full object-cover" {...props} /> : null}
      {title ? (
        <h3 className="absolute bottom-0 w-full p-10 text-center text-[15px] text-lightText">
          {title}
        </h3>
      ) : null}
    </>
  );
}
