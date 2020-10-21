//#region imports

import { HttpAsyncResult } from 'src/app/models/interfaces/http-async-result';
import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result';
import { CreateCommentPayload } from 'src/app/models/payloads/create-comment.payload';
import { CommentProxy, getFakeCurrentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';

//#endregion

/**
 * Metodo que retorna os meus comentários criados
 */
export async function getMyCommentsMockup(): Promise<StorageAsyncResult<CommentProxy[]>> {
  return Promise.resolve({
    error: undefined,
    success: [
      getFakeCurrentProxy(),
      getFakeCurrentProxy(),
      getFakeCurrentProxy(),
      getFakeCurrentProxy(),
    ]
  });
}
/**
 * Método que retorna todos os comentários paginados mockados
 *
 * @param currentPage A página atual
 * @param maxItens A quantidade máxima de itens que deve vir por paginação
 */
export async function getAllCommentsMockup(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCommentProxy>> {
  const paginated = {
    pageCount: 5,
    currentPage,
    items: [],
    maxItens,
  };

  for (let i = 0; i < maxItens; i++){
    paginated.items.push(getFakeCurrentProxy());
  }

  return {
    success: paginated,
  };
}

// tslint:disable-next-line: max-line-length
export async function getCommentsByCategoryIdMockup(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCommentProxy>> {
  const paginated = {
    pageCount: 5,
    currentPage,
    items: [],
    maxItens,
  };

  for (let i = 0; i < maxItens; i++){
    paginated.items.push(getFakeCurrentProxy());
  }

  return {
    success: paginated,
  };

}
/**
 * Metodo que retorna as informações de um comentario criado com sucesso
 *
 * @param payload Informações de um comentário
 */
export async function createCommentMockup(payload: CreateCommentPayload): Promise<HttpAsyncResult<CommentProxy>>{
  await new Promise(resolve => setTimeout(resolve, 1_500));

  return {
    success: getFakeCurrentProxy(),
  }
}
