"use client";

import { useState } from "react";
import { Image, Money, useMoney, ShopPayButton } from "@shopify/hydrogen-react";
import type { Product, ProductVariant } from "lib/shopify/types";

// Mock Product Data using the generated Lone Elk image
const MOCK_PRODUCT: Product = {
  id: "gid://shopify/Product/lone-elk-ruck-blend",
  title: "Lone Elk Ruck Blend",
  handle: "lone-elk-ruck-blend",
  availableForSale: true,
  description: "Bold, dark roast with notes of smoky cacao, cedar, and black cherry. Specially roasted for high-endurance athletes, ruckers, and early mornings.",
  descriptionHtml: "<p>Bold, dark roast with notes of smoky cacao, cedar, and black cherry. Specially roasted for high-endurance athletes, ruckers, and early mornings.</p>",
  tags: ["coffee", "dark-roast"],
  updatedAt: new Date().toISOString(),
  featuredImage: {
    url: "/lone-elk-coffee-bag.jpg",
    altText: "Lone Elk Ruck Blend Coffee Bag",
    width: 800,
    height: 800,
  },
  images: [
    {
      url: "/lone-elk-coffee-bag.jpg",
      altText: "Lone Elk Ruck Blend Coffee Bag Front",
      width: 800,
      height: 800,
    }
  ],
  options: [
    { id: "opt-size", name: "Size", values: ["12oz Bag", "2lb Bag"] },
    { id: "opt-grind", name: "Grind", values: ["Whole Bean", "Filter Grind", "Espresso"] }
  ],
  priceRange: {
    minVariantPrice: { amount: "19.50", currencyCode: "USD" },
    maxVariantPrice: { amount: "38.00", currencyCode: "USD" }
  },
  variants: [
    {
      id: "gid://shopify/ProductVariant/1200000000001",
      title: "12oz Bag / Whole Bean",
      sku: "LE-RUCK-12-WB",
      availableForSale: true,
      quantityAvailable: 45,
      price: { amount: "19.50", currencyCode: "USD" },
      compareAtPrice: { amount: "24.00", currencyCode: "USD" },
      selectedOptions: [
        { name: "Size", value: "12oz Bag" },
        { name: "Grind", value: "Whole Bean" }
      ]
    },
    {
      id: "gid://shopify/ProductVariant/1200000000002",
      title: "12oz Bag / Filter Grind",
      sku: "LE-RUCK-12-FG",
      availableForSale: true,
      quantityAvailable: 12,
      price: { amount: "19.50", currencyCode: "USD" },
      compareAtPrice: null,
      selectedOptions: [
        { name: "Size", value: "12oz Bag" },
        { name: "Grind", value: "Filter Grind" }
      ]
    },
    {
      id: "gid://shopify/ProductVariant/1200000000003",
      title: "12oz Bag / Espresso",
      sku: "LE-RUCK-12-ES",
      availableForSale: false,
      quantityAvailable: 0,
      price: { amount: "19.50", currencyCode: "USD" },
      compareAtPrice: null,
      selectedOptions: [
        { name: "Size", value: "12oz Bag" },
        { name: "Grind", value: "Espresso" }
      ]
    },
    {
      id: "gid://shopify/ProductVariant/1200000000004",
      title: "2lb Bag / Whole Bean",
      sku: "LE-RUCK-32-WB",
      availableForSale: true,
      quantityAvailable: 25,
      price: { amount: "38.00", currencyCode: "USD" },
      compareAtPrice: { amount: "45.00", currencyCode: "USD" },
      selectedOptions: [
        { name: "Size", value: "2lb Bag" },
        { name: "Grind", value: "Whole Bean" }
      ]
    },
    {
      id: "gid://shopify/ProductVariant/1200000000005",
      title: "2lb Bag / Filter Grind",
      sku: "LE-RUCK-32-FG",
      availableForSale: true,
      quantityAvailable: 8,
      price: { amount: "38.00", currencyCode: "USD" },
      compareAtPrice: null,
      selectedOptions: [
        { name: "Size", value: "2lb Bag" },
        { name: "Grind", value: "Filter Grind" }
      ]
    },
    {
      id: "gid://shopify/ProductVariant/1200000000006",
      title: "2lb Bag / Espresso",
      sku: "LE-RUCK-32-ES",
      availableForSale: true,
      quantityAvailable: 15,
      price: { amount: "38.00", currencyCode: "USD" },
      compareAtPrice: null,
      selectedOptions: [
        { name: "Size", value: "2lb Bag" },
        { name: "Grind", value: "Espresso" }
      ]
    }
  ],
  seo: {
    title: "Lone Elk Ruck Blend | Premium Dark Roast Coffee",
    description: "Ruck Blend is our signature dark roast. Premium quality coffee beans sourced ethically and roasted in small batches."
  }
};

export function HydrogenDemo() {
  const [activeTab, setActiveTab] = useState<"setup" | "image" | "money" | "shoppay" | "env">("setup");
  const [selectedSize, setSelectedSize] = useState("12oz Bag");
  const [selectedGrind, setSelectedGrind] = useState("Whole Bean");

  // Find selected variant
  const selectedVariant = MOCK_PRODUCT.variants.find((variant) =>
    variant.selectedOptions.some((opt) => opt.name === "Size" && opt.value === selectedSize) &&
    variant.selectedOptions.some((opt) => opt.name === "Grind" && opt.value === selectedGrind)
  ) || MOCK_PRODUCT.variants[0]!;

  // Use hook to format money dynamically in Javascript code
  const { amount, currencyCode, currencySymbol, localizedString } = useMoney(selectedVariant.price as any);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 text-bone">
      {/* Hero Header */}
      <div className="mb-12 border-b border-seam pb-8 text-center md:text-left">
        <span className="font-mono text-xs tracking-[0.4em] text-field uppercase">
          Integration Sandbox
        </span>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-wide uppercase md:text-5xl">
          Hydrogen React Integration
        </h1>
        <p className="mt-4 max-w-2xl text-base text-bone/60">
          This sandbox shows how <code className="text-field font-mono font-bold">@shopify/hydrogen-react</code> is configured and how you can implement its optimized elements to replace standard hooks or HTML nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Interactive Live Demo: 5 cols */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="border border-seam bg-coal p-6 rounded-lg shadow-xl relative overflow-hidden group">
            <div className="absolute top-3 right-3 z-10 bg-field/90 text-night font-mono text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              Interactive Component
            </div>

            {/* Product Image using @shopify/hydrogen-react <Image> */}
            <div className="relative aspect-square w-full overflow-hidden rounded border border-seam bg-night mb-6 group-hover:scale-[1.01] transition-transform duration-500">
              <Image
                data={MOCK_PRODUCT.featuredImage}
                aspectRatio="1/1"
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover w-full h-full"
                loading="eager"
              />
            </div>

            {/* Title & Brand */}
            <div className="mb-4">
              <span className="font-mono text-[10px] tracking-[0.25em] text-field uppercase">
                Lone Elk Coffee Company
              </span>
              <h3 className="font-display mt-1 text-2xl font-bold tracking-[0.06em] uppercase">
                {MOCK_PRODUCT.title}
              </h3>
            </div>

            {/* Options Selectors */}
            <div className="mb-6 flex flex-col gap-4">
              {MOCK_PRODUCT.options.map((option) => (
                <div key={option.id} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] tracking-wider text-bone/45 uppercase">
                    {option.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((val) => {
                      const isSelected = option.name === "Size" ? selectedSize === val : selectedGrind === val;
                      return (
                        <button
                          key={val}
                          onClick={() => option.name === "Size" ? setSelectedSize(val) : setSelectedGrind(val)}
                          className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-bone text-night border-bone font-semibold"
                              : "border-seam hover:border-bone/50 text-bone/70 hover:text-bone"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Section using <Money> & useMoney */}
            <div className="flex items-center justify-between border-t border-seam pt-4 mb-6">
              <div>
                <span className="font-mono text-[9px] tracking-wider text-bone/45 block mb-1">
                  Formatted via &lt;Money&gt;
                </span>
                <span className="text-xl font-bold flex items-baseline gap-2">
                  <Money
                    data={selectedVariant.price as any}
                    className="text-white text-lg font-semibold"
                  />
                  {selectedVariant.compareAtPrice && (
                    <Money
                      data={selectedVariant.compareAtPrice as any}
                      className="text-sm text-bone/35 line-through"
                    />
                  )}
                </span>
              </div>

              <div className="text-right">
                <span className="font-mono text-[9px] tracking-wider text-bone/45 block mb-1">
                  Raw Output via useMoney()
                </span>
                <span className="font-mono text-xs text-field font-semibold">
                  {localizedString} ({currencyCode})
                </span>
              </div>
            </div>

            {/* Shop Pay Button Component */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-wider text-bone/40 uppercase">
                Direct Checkout via Shop Pay
              </span>
              {selectedVariant.availableForSale ? (
                <div className="rounded overflow-hidden">
                  <ShopPayButton
                    variantIds={[selectedVariant.id]}
                    storeDomain="mock.shop"
                    width="100%"
                    className="shop-pay-btn"
                  />
                </div>
              ) : (
                <button
                  disabled
                  className="w-full bg-seam/40 text-bone/40 font-mono text-xs py-3 border border-seam/50 cursor-not-allowed uppercase tracking-wider text-center"
                >
                  Sold Out
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-seam bg-coal/40 p-4 rounded">
              <span className="font-mono text-[9px] text-bone/45 uppercase block">Selected SKU</span>
              <span className="font-mono text-xs text-white block mt-1 font-semibold">
                {selectedVariant.sku || "N/A"}
              </span>
            </div>
            <div className="border border-seam bg-coal/40 p-4 rounded">
              <span className="font-mono text-[9px] text-bone/45 uppercase block">Inventory status</span>
              <span className={`font-mono text-xs block mt-1 font-semibold ${selectedVariant.availableForSale ? "text-field" : "text-bone/45"}`}>
                {selectedVariant.availableForSale 
                  ? `In Stock (${selectedVariant.quantityAvailable} left)` 
                  : "Unavailable"}
              </span>
            </div>
          </div>
        </div>

        {/* Documentation Tab Panel: 7 cols */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Tabs header */}
          <div className="flex border-b border-seam overflow-x-auto scrollbar-none mb-6">
            <button
              onClick={() => setActiveTab("setup")}
              className={`pb-3 font-mono text-xs tracking-wider cursor-pointer border-b-2 px-4 whitespace-nowrap transition-all duration-200 ${
                activeTab === "setup"
                  ? "border-field text-field font-semibold"
                  : "border-transparent text-bone/50 hover:text-bone hover:border-bone/20"
              }`}
            >
              1. Global Setup
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`pb-3 font-mono text-xs tracking-wider cursor-pointer border-b-2 px-4 whitespace-nowrap transition-all duration-200 ${
                activeTab === "image"
                  ? "border-field text-field font-semibold"
                  : "border-transparent text-bone/50 hover:text-bone hover:border-bone/20"
              }`}
            >
              2. Image Opt
            </button>
            <button
              onClick={() => setActiveTab("money")}
              className={`pb-3 font-mono text-xs tracking-wider cursor-pointer border-b-2 px-4 whitespace-nowrap transition-all duration-200 ${
                activeTab === "money"
                  ? "border-field text-field font-semibold"
                  : "border-transparent text-bone/50 hover:text-bone hover:border-bone/20"
              }`}
            >
              3. Pricing & Money
            </button>
            <button
              onClick={() => setActiveTab("shoppay")}
              className={`pb-3 font-mono text-xs tracking-wider cursor-pointer border-b-2 px-4 whitespace-nowrap transition-all duration-200 ${
                activeTab === "shoppay"
                  ? "border-field text-field font-semibold"
                  : "border-transparent text-bone/50 hover:text-bone hover:border-bone/20"
              }`}
            >
              4. Shop Pay Button
            </button>
            <button
              onClick={() => setActiveTab("env")}
              className={`pb-3 font-mono text-xs tracking-wider cursor-pointer border-b-2 px-4 whitespace-nowrap transition-all duration-200 ${
                activeTab === "env"
                  ? "border-field text-field font-semibold"
                  : "border-transparent text-bone/50 hover:text-bone hover:border-bone/20"
              }`}
            >
              5. Env Setup
            </button>
          </div>

          {/* Tab contents */}
          <div className="bg-coal/65 border border-seam p-6 rounded-lg shadow-inner flex-grow min-h-[400px]">
            {activeTab === "setup" && (
              <div className="space-y-6">
                <h3 className="font-display text-xl font-bold tracking-wider uppercase text-white">
                  1. Global Integration Setup
                </h3>
                <p className="text-sm text-bone/70 leading-relaxed">
                  We've successfully added <code className="text-field font-mono">@shopify/hydrogen-react</code> to the dependencies, created a client wrapper, and integrated it into the root application.
                </p>
                
                <div className="space-y-3">
                  <span className="font-mono text-xs text-field font-semibold block">
                    ✓ 1. Created Client Provider Wrapper
                  </span>
                  <p className="text-xs text-bone/50 leading-relaxed pl-4">
                    In <code className="text-bone hover:underline">components/shopify-provider.tsx</code>, we initialize the <code className="text-bone">ShopifyProvider</code>. It normalizes your domain and passes token details to context, making them available to all child hooks and buttons.
                  </p>

                  <span className="font-mono text-xs text-field font-semibold block">
                    ✓ 2. Linked App Layout Root
                  </span>
                  <p className="text-xs text-bone/50 leading-relaxed pl-4">
                    In <code className="text-bone hover:underline">app/layout.tsx</code>, the server component reads server-side credentials and passes them directly to the client wrapper. This keeps your credentials secure and eliminates the need to prefix everything with <code className="text-white">NEXT_PUBLIC_</code>.
                  </p>
                </div>

                <div className="pt-4">
                  <span className="font-mono text-xs text-bone/40 uppercase block mb-2">Code Snippet (app/layout.tsx Integration)</span>
                  <pre className="bg-night border border-seam p-4 rounded text-xs font-mono overflow-x-auto text-bone/80">
{`// 1. Import wrapper
import { ShopifyProviderWrapper } from "components/shopify-provider";

// 2. Fetch server-side credentials
const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || "mock.shop";
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

// 3. Wrap root elements
return (
  <ShopifyProviderWrapper
    storeDomain={storeDomain}
    storefrontToken={storefrontToken}
  >
    <CartProvider cartPromise={cart}>
      <Navbar />
      <main>{children}</main>
    </CartProvider>
  </ShopifyProviderWrapper>
);`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "image" && (
              <div className="space-y-6">
                <h3 className="font-display text-xl font-bold tracking-wider uppercase text-white">
                  2. Shopify Optimized Image Component
                </h3>
                <p className="text-sm text-bone/70 leading-relaxed">
                  The <code className="text-field font-mono">&lt;Image /&gt;</code> component replaces basic <code className="text-white">&lt;img /&gt;</code> and <code className="text-white">next/image</code> when loading product visual assets directly from the Shopify CDN.
                </p>

                <div className="bg-night/40 border-l-2 border-field p-4 text-xs text-bone/60 leading-relaxed space-y-2">
                  <p className="font-semibold text-white">Why use Hydrogen's Image component?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Automatically requests webp/avif formats supported by the client browser.</li>
                    <li>Generates matching responsive <code className="text-white">srcSet</code> versions (1x, 2x, 3x) automatically based on the Storefront API image object.</li>
                    <li>Accepts an <code className="text-white">aspectRatio</code> prop to prevent layout shifts during page renders.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-xs text-bone/40 uppercase block mb-2">Implementation Example</span>
                  <pre className="bg-night border border-seam p-4 rounded text-xs font-mono overflow-x-auto text-bone/80">
{`import { Image } from "@shopify/hydrogen-react";

// In your card or product details page:
<Image
  data={product.featuredImage} // Direct Image object from Shopify API
  aspectRatio="1/1"            // Enforce layout aspect ratio
  sizes="(max-width: 768px) 100vw, 400px" // Responsive viewport hint
  className="object-cover w-full"
  loading="lazy"              // "eager" for hero banner, "lazy" for cards
/>`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "money" && (
              <div className="space-y-6">
                <h3 className="font-display text-xl font-bold tracking-wider uppercase text-white">
                  3. Pricing & Money Formatting
                </h3>
                <p className="text-sm text-bone/70 leading-relaxed">
                  Headless storefronts require formatting raw floats/strings into readable localized currencies. Hydrogen React offers two mechanisms: a visual component and a React hook.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-seam bg-night/30 p-4 rounded space-y-2">
                    <span className="font-mono text-xs text-field font-semibold block">Component: &lt;Money /&gt;</span>
                    <p className="text-xs text-bone/50 leading-relaxed">
                      Perfect for standard product grids and spec listings where you just want to render formatted text with HTML tag overrides.
                    </p>
                    <pre className="bg-night border border-seam/50 p-2 rounded text-[10px] font-mono text-bone/70">
{`<Money
  data={variant.price}
  as="span"
  className="text-white"
/>`}
                    </pre>
                  </div>

                  <div className="border border-seam bg-night/30 p-4 rounded space-y-2">
                    <span className="font-mono text-xs text-field font-semibold block">Hook: useMoney()</span>
                    <p className="text-xs text-bone/50 leading-relaxed">
                      Perfect when you need raw formatted values inside Javascript logic (e.g. tracking scripts, text attributes, or select labels).
                    </p>
                    <pre className="bg-night border border-seam/50 p-2 rounded text-[10px] font-mono text-bone/70">
{`const { 
  localizedString, 
  currencyCode 
} = useMoney(variant.price);

console.log(localizedString); // "$19.50"`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shoppay" && (
              <div className="space-y-6">
                <h3 className="font-display text-xl font-bold tracking-wider uppercase text-white">
                  4. Instant Shop Pay Checkout Button
                </h3>
                <p className="text-sm text-bone/70 leading-relaxed">
                  The <code className="text-field font-mono">&lt;ShopPayButton /&gt;</code> element is one of the most powerful conversions features in Hydrogen. It takes a Shopify variant ID and automatically handles Shop Pay user logins and secure checkout redirects.
                </p>

                <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded text-xs text-amber-200/70 leading-relaxed">
                  <strong>Important Note:</strong> Shop Pay requires a production checkout flow to fully authenticate, and the button expects active Shopify Storefront API GIDs (e.g. <code className="text-white">gid://shopify/ProductVariant/...</code>).
                </div>

                <div className="pt-2">
                  <span className="font-mono text-xs text-bone/40 uppercase block mb-2">Usage</span>
                  <pre className="bg-night border border-seam p-4 rounded text-xs font-mono overflow-x-auto text-bone/80">
{`import { ShopPayButton } from "@shopify/hydrogen-react";

// Inside a client component wrapped in ShopifyProviderWrapper:
<ShopPayButton
  variantIds={[selectedVariant.id]} // Array of Variant GIDs
  width="100%"                     // Controls display width custom property
  className="rounded-lg shadow"    // Add wrapper class names
/>`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "env" && (
              <div className="space-y-6">
                <h3 className="font-display text-xl font-bold tracking-wider uppercase text-white">
                  5. Storefront Environment Variables
                </h3>
                <p className="text-sm text-bone/70 leading-relaxed">
                  When you have your credentials ready, replace the mock values in your <code className="text-white">.env.local</code> file at the root of the project:
                </p>

                <div className="space-y-4">
                  <pre className="bg-night border border-seam p-4 rounded text-xs font-mono overflow-x-auto text-bone/80">
{`# Add these to your .env.local file:
SHOPIFY_STORE_DOMAIN="[your-store-subdomain].myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="[your-storefront-access-token]"`}
                  </pre>

                  <div className="border border-seam p-4 rounded space-y-2">
                    <span className="font-mono text-xs text-field font-semibold block">How to find these keys:</span>
                    <ol className="list-decimal list-inside text-xs text-bone/60 space-y-1.5 pl-2 leading-relaxed">
                      <li>Log in to your <strong>Shopify Admin Panel</strong>.</li>
                      <li>Go to <strong>Settings</strong> &gt; <strong>App and sales channels</strong>.</li>
                      <li>Click <strong>Develop Apps</strong>, then <strong>Create an App</strong> (or open an existing one).</li>
                      <li>Configure <strong>Storefront API integration</strong> and grant required read scopes.</li>
                      <li>Under the <strong>API Credentials</strong> tab, find and copy your <strong>Storefront API access token</strong>.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
