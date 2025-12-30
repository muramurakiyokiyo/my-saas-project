export default {
  petstore: {
    input: './petstore.yaml',
    output: {
      target: './app/generated/petstore.ts',
      client: 'react-query', // ここで TanStack Query 用のコードを出すよう指定
      mode: 'tags-split',
      mock: {
        type: 'msw',
        output: './src/api/generated', // MSWファイルの出力先をapp/の外に変更
      },
      override: {
        axios: {
          instance: '@/src/api/client#apiClient',
        },
      },
    },
  },
};

