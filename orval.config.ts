module.exports = {
  projectApi: {
    input: '../Backend-Project-Manager/docs/swagger.yaml',
    output: {
      mode: 'tags-split',
      target: './app/api/generated.ts',
      client: 'react-query',
      prettier: true,
      override: {
        useQuery: true,
        mutator: {
          path: './config/axios.ts',
          default: true,
        },
        query: {
          useQuery: true,
          useInfinite: true,
          infinite: {
            param: 'page',
          },
          options: {
            staleTime: 10000,
          },
        },
      },
    },
  },
};
