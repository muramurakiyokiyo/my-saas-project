import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // デフォルト言語を日本語に設定
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
});

// 型安全なナビゲーション関数をエクスポート
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
