//#region imports

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ColorItem } from 'src/app/models/interfaces/color-item';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';
import { CategoryService } from 'src/app/services/category/category.service';

//#endregion

/**
 * Classe que representa a página de criação de comentários
 */

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage {
  //#region Constructor
  /**
   * Construtor padão
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly category: CategoryService,
    private readonly toast: ToastController,
    private readonly loading: LoadingController
  ) {
    this.formGroup = this.fb.group({
      name: [ '', Validators.required ],
      colorIndex: [ 0, Validators.required ],
    });
  }

  //#endregion

  //#region Public Properties

  /**
   * Lista de avatares disponiveis para o usuário
   */
  public readonly listColors: ColorItem[] = [
    {
      color: '#FFC542',
    },
    {
      color: '#3DD598',
    },
    {
      color: '#FF575F',
    },
    {
      color: '#755FE2',
    },
  ];

  /**
   * Diz se está enviando este formulário
   */
  public isSendingForm: boolean;

  /**
   * Aponta para o formulário
   */
  public formGroup: FormGroup;

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

    const{ colorIndex, ...otherValues } = this.formGroup.getRawValue();

    const payload: CreateCategoryPayload = {
      ...otherValues,
      color: this.listColors[colorIndex].color,
    };

    const loading = await this.loading.create({
      cssClass: 'bird--loading',
    });

    await loading.present();
    const [isSuccess, result] = await this.category.createCategory(payload);
    await loading.dismiss();
    await this.showMessage(result);

    this.isSendingForm = false;

    if (!isSuccess){
      return ;
    }

    await this.router.navigateByUrl('/main/categories');

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
    });

    await toast.present();
  }

  //#endregion

}
