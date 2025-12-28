export default {
  petstore: {
    input: './petstore.yaml',
    output: {
      target: './app/generated/petstore.ts',
      client: 'react-query', // ここで TanStack Query 用のコードを出すよう指定
      mode: 'tags-split',
      mock: true,
    },
  },
};

