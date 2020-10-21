//#region imports

import { Injectable } from '@angular/core';
import { CommentInteractor } from 'src/app/interactors/comment/comment.interactor';
import { CreateCommentPayload } from 'src/app/models/payloads/create-comment.payload';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';

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

  /**
   * Método que retorna todos os comentários criados na aplicação
   *
   * @param currentPage A página atual
   * @param maxItens A quantidade máxima de itens que deve vir por paginação
   */
  public async getAllComments(currentPage: number, maxItens: number): Promise<PaginatedCommentProxy> {
    const { error, success } = await this.interactor.getAllComments(currentPage, maxItens);

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

  public async getCommentsByCategoryId(categoryId: number, currentPage: number, maxItens: number): Promise<PaginatedCommentProxy>{
    const { error, success } = await this.interactor.getCommentsByCategoryId(categoryId, currentPage, maxItens);

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
  public async createComment(payload: CreateCommentPayload): Promise<[boolean, string]>{
    const { error } = await this.interactor.createComment(payload);
    if (error) {
      return [false, 'Ocorreu um erro ao criar o comentário, tente novamente'];
    }
    return [true, 'Comentário criado com sucesso'];
  }
  //#endregion
}
