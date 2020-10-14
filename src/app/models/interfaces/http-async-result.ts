/**
 * interface que representa valores buscados no cache
 */
export interface HttpAsyncResult<TProxy> {
  /**
   * caso dê certo, aqui vai constar o valor buscado no cache
   */
  success?: TProxy | null;
  /**
   * caso dê errado, aqui vai constar a mensagem de erro
   */
  error: string;
}
