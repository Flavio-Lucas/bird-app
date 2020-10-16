//#region imports

import { HttpAsyncResult } from 'src/app/models/interfaces/http-async-result';
import { getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';

//#endregion

/**
 * Método que retorna todos os comentários paginados mockados
 *
 * @param currentPage A página atual
 * @param maxItens A quantidade máxima de itens que deve vir por paginação
 */
export async function getCategoriesMockup(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCategoryProxy>> {
  const paginated = {
    pageCount: 5,
    currentPage,
    items: [],
    maxItens,
  };

  for (let i = 0; i < maxItens; i++){
    paginated.items.push(getFakeCategoryProxy());
  }

  return {
    success: paginated,
  };
}
