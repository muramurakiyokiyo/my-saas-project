import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// グローバルエラーハンドラーを設定するための型
type ErrorHandler = (error: AxiosError) => void;

let globalErrorHandler: ErrorHandler | null = null;

// カスタムaxiosインスタンスを作成
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  timeout: 10000,
});

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 必要に応じてリクエストヘッダーなどを追加
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // グローバルエラーハンドラーが設定されている場合はそれを使用
    if (globalErrorHandler) {
      globalErrorHandler(error);
    }
    return Promise.reject(error);
  }
);

// グローバルエラーハンドラーを設定する関数
export function setGlobalErrorHandler(handler: ErrorHandler) {
  globalErrorHandler = handler;
}

// エラーハンドラーをクリアする関数
export function clearGlobalErrorHandler() {
  globalErrorHandler = null;
}

export default apiClient;

