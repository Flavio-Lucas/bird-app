//#region imports

import { CategoryProxy } from './category.proxy';

//#endregion
/**
 * a interface representa as informações de um comentário vindo da API
 */
export interface CommentProxy {
  /**
   * identificação deste comentário
   */
  id: number;
  /**
   * data de quando foi criado este comentário
   */
  createdAt: string;

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

  /**
   * as informações sobre a categoria
   */

   category?: CategoryProxy;

}

/**
 * Metodo que retorna dados mocados
 */

export function getFakeCurrentProxy(): CommentProxy {
  return {
    id: 1,
    message: 'mensagem gigantesca que eu estou digitando aleatóriamente para não precisar pesquisar aqueles textos aleatódios de lorem ipsum soloris sit amet ou algo do genero na internet.',
    categoryId: 2,
    createdAt: new Date().toISOString(),
    personName: 'Flavio Lucas',
    personEmoji: '🐥',
    personColor: '#FF565E',
    category: {
      name: 'TypeScript',
      color: '#FFC542',
      comments: [],
      id: 2,
    },

  };
}
