import { getCollections } from "@/lib/store/products";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default async function Collections() {
  const collections = await getCollections();
  const pathname = usePathname();

  return (
    <>
      <nav className="mb-4 flex gap-2">
        <Link
          href="/search"
          className={clsx(
            "rounded-lg px-3 py-2 text-sm font-semibold hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white",
            {
              "bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white":
                pathname === "/search",
              "text-neutral-500 dark:text-neutral-400": pathname !== "/search",
            }
          )}
        >
          All
        </Link>
        {collections.map((collection) => (
          <Link
            key={collection.handle}
            href={`/search/${collection.handle}`}
            className={clsx(
              "rounded-lg px-3 py-2 text-sm font-semibold hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white",
              {
                "bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white":
                  pathname === `/search/${collection.handle}`,
                "text-neutral-500 dark:text-neutral-400":
                  pathname !== `/search/${collection.handle}`,
              }
            )}
          >
            {collection.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
