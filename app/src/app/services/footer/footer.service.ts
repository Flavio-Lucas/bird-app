//#region imports

import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FooterState } from 'src/app/models/enums/footer-satate';

//#endregion

/**
 * A classe que representa o serviço que lida com estilos e estados do footer da aplicação
 */

@Injectable({
  providedIn: 'root'
})
export class FooterService {
//#region constructor
/**
 * Construtor padrão
 */
  constructor(
    private readonly router: Router,
  ) {
    this.router.events.subscribe(() => {
      const currentURL = this.router.url;

      if (currentURL.startsWith('/main/categories')){
        return void this.selectedFooterSubject.next(FooterState.CATEGORIES);
      }
      if (currentURL.startsWith('/main/my-comments')){
        return void this.selectedFooterSubject.next(FooterState.MY_COMMENTS);
      }
      if (currentURL.startsWith('/main/all-comments')){
        return void this.selectedFooterSubject.next(FooterState.ALL_COMMENTS);
      }

    });
  }

  //#endregion

  //#region Private Properties

  /**
   * evento lançado para dizer qual menu do footer é o atualmente selecionado
   */
  private readonly selectedFooterSubject: BehaviorSubject<FooterState> = new BehaviorSubject<FooterState> (FooterState.CATEGORIES)

  //#endregion

  //#region Public Methods

  /**
   * metodo que retorna a referencia dp Observable que diz qual é o icone de menus atualmente selecionado
   */
  public getCurrentSelectedFooter$(): Observable<FooterState> {
    return this.selectedFooterSubject.asObservable();
  }

  //#endregion

}
