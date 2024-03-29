export const environment = {
  production: true,
  mockupEnabled: false,
  config: {
    dbName: '__bird',
  },
  keys: {
    myComments: 'MY_COMMENTS_KEY',
  },
  api: {
    baseUrl: 'http://localhost:3000',
    comment: {
      list: '/comments?page={currentPage}&maxItens={maxItens}&includeCategory=true',
      listByCategoryId: '/comments?page={currentPage}&maxItens={maxItens}&includeCategory=true',
      create: '/comments',
    },
    category: {
      list: '/categories?page={currentPage}&maxItens={maxItens}',
      create: '/comments',
    },
  },
};