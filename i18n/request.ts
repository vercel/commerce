import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const locale = ((await cookies()).get('locale')?.value as string) || 'it';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
