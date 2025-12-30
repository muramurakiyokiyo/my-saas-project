'use client'
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { setGlobalErrorHandler, clearGlobalErrorHandler } from './client';
import type { AxiosError } from 'axios';

// エラーハンドラーを初期化するコンポーネント
export function ErrorHandlerInitializer() {
  const locale = useLocale();
  const t = useTranslations('apiErrors');

  useEffect(() => {
    const handler = (error: AxiosError) => {
      // ネットワークエラーの場合（オフライン、タイムアウト、接続エラーなど）
      if (!error.response) {
        // タイムアウトエラーの場合
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          toast.error(t('timeout'));
        } else {
          // その他のネットワークエラー（オフラインなど）
          toast.error(t('network'));
        }
        // エラーを呼び出し元に伝播させる（React QueryがisPendingをリセットできるように）
        return;
      }

      const status = error.response.status;
      let errorMessage: string;

      switch (status) {
        case 400:
          errorMessage = t('400');
          break;
        case 401:
          errorMessage = t('401');
          break;
        case 403:
          errorMessage = t('403');
          break;
        case 404:
          errorMessage = t('404');
          break;
        case 500:
          errorMessage = t('500');
          break;
        case 502:
          errorMessage = t('502');
          break;
        case 503:
          errorMessage = t('503');
          break;
        default:
          errorMessage = t('unknown');
      }

      // すべてのエラーをトーストで表示
      toast.error(errorMessage);
    };

    setGlobalErrorHandler(handler);

    return () => {
      clearGlobalErrorHandler();
    };
  }, [locale, t]);

  return null;
}

