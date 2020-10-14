//#region imports
import { Component, OnInit } from '@angular/core';
import { CommentProxy, getFakeCurrentProxy } from 'src/app/models/proxies/comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';

//#endregion

/**
 * Classe que representa a página q lista todos os meus comentários
 */

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bird-my-comments',
  templateUrl: './my-comments.page.html',
  styleUrls: ['./my-comments.page.scss'],
})
export class MyCommentsPage implements OnInit {

  //#region constructor
  /**
   * classe contrutora padrão
   */
  constructor(
    private readonly comment: CommentService,
  ) { }

  //#endregion

  //#region public properties
  /**
   * A lista de comentáios feitos por mim;
   */
  public listComments: CommentProxy[] = [];

  //#endregion
  //#region lifeCicle Events

  public async ngOnInit(): Promise<void> {
    this.listComments = await this.comment.getMyComments();
  }
  //#region public methods

  /**
   * comentário que retorna o indentidficador do item das listas para ser usado
   * para identificar se o item já existe na lista, caso exista, não
   * deve fazer alteração na lista
   *
   * @param index O indice dete item na lista
   * @param value As informações do item
   */

  public trackById(index: number, value: CommentProxy): number {
    return value.id;
  }
  //#endregion

  

}
