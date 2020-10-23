/**
 * interface que representa as informações necessárias para criar um comentário
 */

export interface CreateCommentPayload {
  /**
   * A mensagem deste comentário
   */
  message: string;
  /**
   * O nome do autor deste comentário
   */
  personName: string;

  /**
   * Emoji que representa este autor
   */

  personEmoji: string;

  /**
   * A cor de fundo da rota desta pessoa
   */
  personColor: string;

  /**
   * identificação da categoria
   */

  categoryId: number;
}
