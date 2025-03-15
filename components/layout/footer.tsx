import FooterMenu from "@/components/layout/footer-menu";
import { getMenu } from "@/lib/store/menu";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
  const menu = await getMenu("footer");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="border-t border-neutral-200 bg-white text-black dark:border-neutral-700 dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-neutral-200 py-12 transition-colors duration-150 dark:border-neutral-700 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-bold">Shop</h3>
            {menu && <FooterMenu menu={menu} />}
          </div>
        </div>
        <div className="py-6 text-sm">
          <div className="text-neutral-500 dark:text-neutral-400">
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
