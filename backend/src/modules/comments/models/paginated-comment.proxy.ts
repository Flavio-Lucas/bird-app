//#region imports

import { ApiProperty } from "@nestjs/swagger";
import { BasePaginatedProxy } from "src/common/base-paginated.proxy";
import { CommentsEntity } from "src/typeorm/entities/comment.entity";
import { CommentsProxy } from "./comment.proxy";

//#endregion

/**
 * A classe base que representa os resultados páginados das categorias
 */
export class PaginatedCommentProxy extends BasePaginatedProxy {

  //#region construtor

  /**
   * Construtor padrão
   */
  constructor (
    entities: CommentsEntity[],
    currentPage: number,
    pageCount: number,
    maxItens: number,
  ) {
    super(currentPage, pageCount, maxItens);
  
    this.itens = Array.isArray(entities) && entities.map(category => new CommentsProxy(category));
  }

  //#endregion

  /**
   * Os itens desta paginação
   */
  @ApiProperty({ type: () => CommentsProxy, isArray: true })
  public itens: CommentsProxy[];

}
