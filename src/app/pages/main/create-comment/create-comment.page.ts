//#region imports

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AvatarItem } from 'src/app/models/interfaces/avatar-item';
import { CreateCommentPayload } from 'src/app/models/payloads/create-comment.payload';
import { CommentService } from 'src/app/services/comment/comment.service';

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
    private readonly fb: FormBuilder,
    private readonly comment: CommentService,
    private readonly toast: ToastController,
    private readonly loading: LoadingController,
  ) {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) || 0;
    if (this.categoryId === 0) {
      return void this.router.navigateByUrl('/main/categories');
    }
    this.formGroup = this.fb.group({

      personName:        [ '', Validators.required ],
      personAvatarIndex: [ 0, Validators.required ],
      categoryId:        [ this.categoryId, Validators.required ],
      message:           [ '', Validators.required ],

    });
  }

  //#endregion

  //#region Public Properties

  /**
   * Diz se está enviando este formulário
   */
  public isSendingForm: boolean;

  /**
   * Aponta para o formulário
   */
  public formGroup: FormGroup;

  /**
   * A identificação da categoria
   */
  public readonly categoryId: number;

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

  //#region public methods

  /**
   * Metodo executado quando o formulário é enviado
   */
  public async onSubmit(): Promise<void> {
    if (this.isSendingForm){
      return ;
    }
    this.isSendingForm = true;

    const{ personAvatarIndex, ...otherValues } = this.formGroup.getRawValue();

    const payload: CreateCommentPayload = {
      ...otherValues,
      personEmoji: this.listAvatar[personAvatarIndex].personEmoji,
      personColor: this.listAvatar[personAvatarIndex].personColor,
    };

    const loading = await this.loading.create({
      cssClass: 'bird--loading',
    });

    await loading.present();
    const [isSuccess, result] = await this.comment.createComment(payload);
    await loading.dismiss();
    await this.showMessage(result);

    this.isSendingForm = false;

    if (!isSuccess){
      return ;
    }

    await this.router.navigateByUrl('/main/categories/${ this.categoryId }');

  }

  //#endregion

  //#region Private Methods

  /**
   * Metodo q exibe a mensagem de erro
   *
   * @param message Mensagem de erro
   */
  private async showMessage(message: string): Promise<void> {
    const toast = await this.toast.create({
      message,
      duration: 4_000,
      position: 'top'
    });

    await toast.present();
  }

  //#endregion
}
