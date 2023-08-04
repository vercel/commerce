export function getAccessToken(): string {
  return `${process.env.SHOPWARE_ACCESS_TOKEN}`;
}

export function getStoreDomainWithApiType(): string {
  return getStoreDomain() + '/' + getApiType();
}

export function getStoreDomain(protocol: boolean = true): string {
  return protocol
    ? `https://${process.env.SHOPWARE_STORE_DOMAIN!}`
    : `${process.env.SHOPWARE_STORE_DOMAIN!}`;
}

export function getApiType(): 'store-api' | 'admin-api' {
  if (`${process.env.SHOPWARE_API_TYPE!}` === 'admin-api') {
    return 'admin-api';
  }

  return 'store-api';
}

export function isSeoUrls(): boolean {
  return `${process.env.SHOPWARE_USE_SEO_URLS}` === 'true';
}
