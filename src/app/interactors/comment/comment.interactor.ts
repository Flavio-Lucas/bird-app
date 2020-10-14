//#region imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageAsyncResult } from 'src/app/models/interfaces/storage-async-result';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { environment } from 'src/environments/environment';
import { getMyCommentsMockup } from './comment.mockup';

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
    public async getAllComments(): Promise<CommentProxy[]> {
      if (environment.mockupEnabled){}
      // return await getAllCommentsMockup();
      // TODO: implementar o mockup

      // TODO: Fazer requisição http
      return ;
    }

  //#endregion
}
