import Image from 'next/image';
import Link from 'next/link';

export function Hero({
  title,
  description,
  ctaText1,
  ctaText2,
  ctaText3,
  image1,
  image2,
  image3,
  image4,
  image5
}: {
  title: string;
  description: string;
  ctaText1: string;
  ctaText2: string;
  ctaText3: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}) {
  return (
    <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
      <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          <p>{title}</p>
          <p>{description}</p>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
          <p>{ctaText1}</p>
          <p>{ctaText2}</p>
          <br />
          <p>{ctaText3}</p>
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <Link href="/landing">
            <span className="rounded-md bg-0-fern_green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-0-fern_green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-0-fern_green-600">
              Shop
            </span>
          </Link>
          <Link href="/consulting">
            <span className="text-sm font-semibold leading-6 text-gray-900">
              Consulting <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="mt-14 flex justify-center gap-8 sm:-mt-44 sm:justify-evenly sm:pl-20 lg:mt-0 lg:justify-evenly lg:pl-0">
        <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
          <div className="relative">
            <Image
              src={image1}
              alt={''}
              width={528}
              height={528}
              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            ></Image>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
          </div>
        </div>
        <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
          <div className="relative">
            <Image
              src={image2}
              alt={''}
              width={528}
              height={528}
              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            ></Image>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="relative">
            <Image
              src={image3}
              alt={''}
              width={528}
              height={528}
              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            ></Image>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
          </div>
        </div>
        <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
          <div className="relative">
            <Image
              src={image4}
              alt={''}
              width={528}
              height={528}
              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            ></Image>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="relative">
            <Image
              src={image5}
              alt={''}
              width={528}
              height={528}
              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            ></Image>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
