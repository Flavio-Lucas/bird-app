//#region imports

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarItem } from 'src/app/models/interfaces/avatar-item';

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

  //#region Public Properties

  /**
   * A identificação da categoria
   */
  public readonly categoryId: number;

  //#endregion

  //#region Public Properties

  /**
   * Lista de avatares disponiveis para o usuário
   */
  public readonly listAvatar: AvatarItem[] = [
    {
      personEmoji: 'assets/images/avatar_1.png',
      personColor: '#FFC542',
    },
    {
      personEmoji: 'assets/images/avatar_2.png',
      personColor: '#3DD598',
    },
    {
      personEmoji: 'assets/images/avatar_3.png',
      personColor: '#FF575F',
    },
    {
      personEmoji: 'assets/images/avatar_4.png',
      personColor: '#755FE2',
    },
  ];
  //#endregion
}
