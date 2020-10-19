//#region imports

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//#endregion

/**
 * Classe que representa a página de criação de comentários
 */

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.page.html',
  styleUrls: ['./create-comment.page.scss'],
})
export class CreateCommentPage {
  //#region Constructor
  /**
   * Construtor padão
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) || 0;
    if (this.categoryId === 0) {
      return void this.router.navigateByUrl('/main/categories');
    }
  }

  //#endregion

  //#region private Properties
  /**
   * A identificação da categoria
   */
  private readonly categoryId: number;

  //#endregion
}
