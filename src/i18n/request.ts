import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // リクエストからロケールを取得、なければデフォルトを使用
  let locale = await requestLocale;

  // 有効なロケールでない場合はデフォルトを使用
  if (!locale || !routing.locales.includes(locale as 'ja' | 'en')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
