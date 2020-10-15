//#region imports
import { Component, OnInit } from '@angular/core';
import { TrackablePage } from 'src/app/common/trackable.page';
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
export class MyCommentsPage extends TrackablePage implements OnInit {

  //#region constructor
  /**
   * classe contrutora padrão
   */
  constructor(
    private readonly comment: CommentService,
  ) {
    super();
  }

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
  //#endregion

}
