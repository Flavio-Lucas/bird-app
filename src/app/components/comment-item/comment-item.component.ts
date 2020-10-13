//#region imports
import { Component, Input } from '@angular/core';

import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
//#endregion

/**
 * A classe do componente que exibe as informações de um comentário
 */

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bird-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent{
  //#region construtor

  /**
   * construtor padrão
   */
  constructor() { }

  //#endregion

  //#region inputs

  /**
   * O onteudo deste componente
   */
  @Input()
  public content: CommentProxy;
  //#endregion


}
