//#region imports

import { Injectable } from '@angular/core';
import { CommentInteractor } from 'src/app/interactors/comment/comment.interactor';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';

//#endregion

/**
 * A classe que representa o serviço que lida com os comentários da aplicação
 */

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  //#region construtor

  /**
   * Construtor padrão
   */

  constructor(
    private readonly interactor: CommentInteractor,
  ) { }

  //#endregion

  //#region public Methods
    /**
     * Metodo que retorna os meus comentários criados
     */
    public async getMyComments(): Promise<CommentProxy[]> {
      const { error, success } = await this.interactor.getMyComments();
      if (error){
        return [];
      }
      if (!Array.isArray(success)){
        return [];
      }
      return success;
    }
  //#endregion
}
