//#region 

import { Component } from '@angular/core';
import { TrackablePage } from 'src/app/common/trackable.page';
import { CategoryProxy, getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';

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
export class CategoriesPage extends TrackablePage {
  //#region Constructor
  /**
   * Construtor padrão
   */
  constructor() {
    super();
  }

  //#endregion

  //#region public properties
  /**
   * Lista de categorias
   */
  public listCategories: CategoryProxy[] = [
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
  ];
}
