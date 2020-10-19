//#region imports

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { TrackablePage } from 'src/app/common/trackable.page';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';

//#endregion
/**
 * Classe que representa o componente dos comentários de uma categoria
 */
@Component({
  selector: 'app-category-comments',
  templateUrl: './category-comments.page.html',
  styleUrls: ['./category-comments.page.scss'],
})
export class CategoryCommentsPage extends TrackablePage implements OnInit, OnDestroy {
  //#region Constructor
  /**
   * Construtor padrão
   */

  constructor(
    private readonly comment: CommentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    super();

    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) || 0;
    if (this.categoryId === 0) {
      this.router.navigateByUrl('/main/categories');
    }
    this.currentScrollSubscription = this.currentScrollFrameSubject.pipe(
      throttleTime(16),
      map(currentDiv => {
        const threshold = 100;
        const position = currentDiv.scrollTop + currentDiv.offsetHeight;
        const height = currentDiv.scrollHeight;

        return position > height - threshold;
      })
    ).subscribe(isNearBottom => isNearBottom && this.nextPage());
  }

  //#endregion

  //#region Private Subscriptions

  /**
   * A inscrição para escutar os eventos lançados do container atual
   */
  private readonly currentScrollSubscription: Subscription;

  //#endregion

  //#region Private Events

  /**
   * O evento que lança o container dos itens atual
   */
  private readonly currentScrollFrameSubject: Subject<HTMLDivElement> = new Subject<HTMLDivElement>();

  //#endregion

  //#region Public Properties

  /**
   * A lista com todos os comentários
   */
  public listCategoryComments: CommentProxy[] = [];

  /**
   * As informações de paginação
   */
  public paginatedComment: PaginatedCommentProxy;

  /**
   * Diz se está carregando mais comentários
   */
  public isLoadingData: boolean;

  //#endregion

  //#region Private Properties
  /**
   * A identificação da categoria
   */
  private readonly categoryId: number;
  //#endregion

  //#region LifeCycle Events

  /**
   * Método executado ao iniciar o componente
   */
  public async ngOnInit(): Promise<void> {
    await this.nextPage();
  }

  /**
   * Método executado ao destruir o componente
   */
  public ngOnDestroy(): void {
    this.currentScrollSubscription.unsubscribe();
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que carrega a próxima página de comentários
   */
  public async nextPage(): Promise<void> {
    if (this.paginatedComment?.currentPage >= this.paginatedComment?.pageCount) {
      return ;
    }

    if (this.isLoadingData) {
      return ;
    }

    this.isLoadingData = true;

    const currentPage = this.paginatedComment?.currentPage || 0;

    this.paginatedComment = await this.comment.getCommentsByCategoryId(this.categoryId, currentPage + 1, 8);
    this.listCategoryComments = [...this.listCategoryComments, ...this.paginatedComment.items];

    this.isLoadingData = false;
  }

  /**
   * Método que é executado toda vez que ocorre um evento de scroll no container dos itens
   *
   * @param event As informações do evento de Scroll
   */
  public onScroll(event: any): void {
    this.currentScrollFrameSubject.next(event.currentTarget);
  }

  //#endregion

}
