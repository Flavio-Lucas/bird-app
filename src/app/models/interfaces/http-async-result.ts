//#region Imports

import { HttpErrorResponse } from '@angular/common/http';

//#endregion

/**
 * A interface que representa o resultado de uma requisição HTTP de forma assincrona
 */
export interface HttpAsyncResult<TProxy> {
  /**
   * caso dê certo, aqui vai constar o valor buscado no cache
   */
  success?: TProxy | null;
  /**
   * caso dê errado, aqui vai constar a mensagem de erro
   */
  error?: HttpErrorResponse;
}
