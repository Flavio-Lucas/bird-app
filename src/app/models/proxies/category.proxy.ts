//#region Imports

import { CommentProxy } from './comment.proxy';

//#endregion

/**
 * A interface que referencia as informações de uma categoria para a API
 */

export interface CategoryProxy {
  /**
   * A identificação desta categoria
   */
  id: number;
  /**
   * O nome desta categoria
   */
  name: string;
  /**
   * A cor desta categoria
   */
  color: string;

  /**
   * A lista de comentários existente nessa categoria
   */
  comments: CommentProxy[];
}