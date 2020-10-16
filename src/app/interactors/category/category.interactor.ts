//#region imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpAsyncResult } from 'src/app/models/interfaces/http-async-result';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';
import { environment } from 'src/environments/environment';
import { getCategoriesMockup } from './category.mockup';

//#endregion

/**
 * A classe que representa o interactor que lida com as rodas e o cache das Categorias
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryInteractor {

  //#region construtor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly http: HttpClient,
  ) {}

  //#endregion

  //#region Http Methods

  /**
   * Metodo q retorna todos as Categorias
   */
  public async getCategories(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCategoryProxy>> {
    if (environment.mockupEnabled){
      return await getCategoriesMockup(currentPage, maxItens);
    }
    const url = environment.api.category.list
    .replace('{currentPage}', currentPage.toString())
    .replace('{maxItens}', maxItens.toString());

    return await this.http.get<PaginatedCategoryProxy>(url)
    .toPromise()
    .then(success => ({ success, error: undefined }))
    .catch(error => ({ success: undefined, error  }));
  }

  //#endregion
}
