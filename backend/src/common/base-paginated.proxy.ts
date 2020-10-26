//#region imports

import { ApiProperty } from "@nestjs/swagger";

//#endregion

/**
 * A classe base que representa os resultados páginados
 */
export class BasePaginatedProxy {

  //#region construtor

  /**
   * Construtor padrão
   */
  constructor (
    currentPage: number,
    pageCount: number,
    maxItens: number,
  ) {

    this.currentPage = currentPage;
    this.pageCount = pageCount;
    this.maxItens = maxItens
  }
  /**
   * O indice atual da paginação
   */
  @ApiProperty()
  public currentPage: number;

  /**
   * O total de paǵinas dessa paginação
   */
  @ApiProperty()
  public pageCount: number;

  /**
   * O total de itens por página
   */
  @ApiProperty()
  public maxItens: number;
}
