"use client";

import { ReactNode } from "react";
import { ShopifyProvider } from "@shopify/hydrogen-react";

interface ShopifyProviderWrapperProps {
  children: ReactNode;
  storeDomain?: string;
  storefrontToken?: string;
  storefrontApiVersion?: string;
  countryIsoCode?: string;
  languageIsoCode?: string;
}

export function ShopifyProviderWrapper({
  children,
  storeDomain,
  storefrontToken,
  storefrontApiVersion = "2026-07",
  countryIsoCode = "US",
  languageIsoCode = "EN",
}: ShopifyProviderWrapperProps) {
  // Normalize domain & handle empty string fallbacks
  const finalDomain = (storeDomain || "mock.shop")
    .replace(/^https?:\/\//, "") // Remove protocol if present
    .replace(/\/$/, ""); // Remove trailing slash if present

  const finalToken = storefrontToken || "mock-token";

  return (
    <ShopifyProvider
      storeDomain={finalDomain}
      storefrontToken={finalToken}
      storefrontApiVersion={storefrontApiVersion}
      countryIsoCode={countryIsoCode as any}
      languageIsoCode={languageIsoCode as any}
    >
      {children}
    </ShopifyProvider>
  );
}

