//#region imports

import { Injectable } from '@angular/core';
import { CategoryInteractor } from 'src/app/interactors/category/category.interactor';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';

//#endregion

/**
 * A classe que representa o serviço que lida com os comentários da aplicação
 */

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  //#region construtor

  /**
   * Construtor padrão
   */

  constructor(
    private readonly interactor: CategoryInteractor,
  ) { }

  //#endregion

  //#region public Methods
  /**
   * Método que retorna todos os comentários criados na aplicação
   *
   * @param currentPage A página atual
   * @param maxItens A quantidade máxima de itens que deve vir por paginação
   */
  public async getCategories(currentPage: number, maxItens: number): Promise<PaginatedCategoryProxy> {
    const { error, success } = await this.interactor.getCategories(currentPage, maxItens);

    if (error){
      return {
        pageCount: 1,
        currentPage: 1,
        items: [],
        maxItens,
      };
    }

    return success;
  }

  /**
   * metodo que cria um novo comentário
   *
   * @param payload conteudo do comentário
   */
  public async createCategory(payload: CreateCategoryPayload): Promise<[boolean, string]>{
    const { error } = await this.interactor.createCategory(payload);
    if (error) {
      return [false, 'Ocorreu um erro ao criar a categoria, tente novamente'];
    }
    return [true, 'Categoria criada com sucesso'];
  }
  //#endregion

  //#endregion
}