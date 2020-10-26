//#region imports

import { ApiProperty } from "@nestjs/swagger";
import { BasePaginatedProxy } from "src/common/base-paginated.proxy";
import { CategoryEntity } from "src/typeorm/entities/category.entity";
import { CategoryProxy } from "./cateory.proxy";

//#endregion

/**
 * A classe base que representa os resultados páginados das categorias
 */
export class PaginatedCategoryProxy extends BasePaginatedProxy {

  //#region construtor

  /**
   * Construtor padrão
   */
  constructor (
    entities: CategoryEntity[],
    currentPage: number,
    pageCount: number,
    maxItens: number,
  ) {
    super(currentPage, pageCount, maxItens);
  
    this.itens = Array.isArray(entities) && entities.map(category => new CategoryProxy(category));
  }

  //#endregion

  /**
   * Os itens desta paginação
   */
  @ApiProperty({ type: () => CategoryProxy, isArray: true })
  public itens: CategoryProxy[];

}
