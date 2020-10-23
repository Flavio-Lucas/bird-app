//#region 

import { Component, Input } from '@angular/core';
import { CategoryProxy } from 'src/app/models/proxies/category.proxy';

//#endregion

/**
 * Classe que representa o componente que exibe as informações de uma categoria
 */
@Component({
  selector: 'bird-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {

  //#region Constructor

  /**
   * Construtor pradão
   */
  constructor() { }

  //#endregion

  //#region Inputs
  /**
   * As informações de conteudo deste componente
   */
  @Input()
  public content: CategoryProxy;
  
  //#endregion

}
