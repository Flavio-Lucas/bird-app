//#region imports

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { TrackablePage } from 'src/app/common/trackable.page';
import { CategoryProxy } from 'src/app/models/proxies/category.proxy';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category.proxy';
import { CategoryService } from 'src/app/services/category/category.service';

//#endregion

/**
 * Classe que representa a página que lista as caregorias da aplicação
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bird-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage extends TrackablePage implements OnInit, OnDestroy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly category: CategoryService,
  ) {
    super();

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
   * A lista com todos os categorias
   */
  public listCategories: CategoryProxy[] = [];

  /**
   * As informações de paginação
   */
  public paginatedCategory: PaginatedCategoryProxy;

  /**
   * Diz se está carregando mais Categorias
   */
  public isLoadingCategories: boolean;

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
   * Método que carrega a próxima página de Categorias
   */
  public async nextPage(): Promise<void> {
    if (this.paginatedCategory?.currentPage >= this.paginatedCategory?.pageCount) {
      return ;
    }

    if (this.isLoadingCategories) {
      return ;
    }

    this.isLoadingCategories = true;

    const currentPage = this.paginatedCategory?.currentPage || 0;

    this.paginatedCategory = await this.category.getCategories(currentPage + 1, 5);
    this.listCategories = [...this.listCategories, ...this.paginatedCategory.items];

    this.isLoadingCategories = false;
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
