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
      // GETリクエストのエラーはReact Queryが処理するため、スキップ
      // ただし、明示的にエラー表示が必要な場合は表示する
      const method = error.config?.method?.toUpperCase();
      
      // ネットワークエラーの場合
      if (!error.response) {
        if (method !== 'GET') {
          toast.error(t('network'));
        }
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

      // GETリクエスト以外の場合のみトーストを表示
      // GETリクエストのエラーはReact Queryが処理するため
      if (method !== 'GET') {
        toast.error(errorMessage);
      }
    };

    setGlobalErrorHandler(handler);

    return () => {
      clearGlobalErrorHandler();
    };
  }, [locale, t]);

  return null;
}

