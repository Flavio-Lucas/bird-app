/**
 * interface que representa as informações necessárias para criar uma categoria
 */

export interface CreateCategoryPayload {
  /**
   * O nome do autor desta categoria
   */
  name: string;

  /**
   * A cor de fundo da rota desta categoria
   */
  color: string;
}
