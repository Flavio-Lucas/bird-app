//#region imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpAsyncResult } from 'src/app/models/interfaces/http-async-result';
import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { environment } from 'src/environments/environment';
import { getAllCommentsMockup, getMyCommentsMockup } from './comment.mockup';

//#endregion

/**
 * A classe que representa o interactor que lida com as rodas e o cache dos comentários
 */
@Injectable({
  providedIn: 'root',
})
export class CommentInteractor {

  //#region construtor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly http: HttpClient,
    private readonly storage: Storage,
  ) {}

  //#endregion

  //#region storage Methods
    /**
     * Metodo que retorna os meus comentários criados
     */
    public async getMyComments(): Promise<StorageAsyncResult<CommentProxy[]>> {
      if (environment.mockupEnabled) {
        return await getMyCommentsMockup();
      }

      await this.storage.ready().catch(console.error);

      return this.storage.get(environment.keys.myComments)
      .then(success => ({ success, error: undefined }))
      .catch(() => ({ success: undefined, error: 'ocorreu um erro o buscar no cache por favor tente novamente' }));
    }
  //#endregion

  //#region Http Methods

    /**
     * Metodo q retorna todos os comentários
     */
    public async getAllComments(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCommentProxy>> {
      if (environment.mockupEnabled){
        return await getAllCommentsMockup(currentPage, maxItens);
      }
      const url = environment.api.comment.list
      .replace('{currentPage}', currentPage.toString())
      .replace('{maxItens}', maxItens.toString());

      return await this.http.get<PaginatedCommentProxy>(url)
      .toPromise()
      .then(success => ({ success, error: undefined }))
      .catch(error => ({ success: undefined, error  }));
    }

  //#endregion
}
