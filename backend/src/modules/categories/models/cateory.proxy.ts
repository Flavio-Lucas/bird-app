//#region imports

import { ApiProperty } from "@nestjs/swagger";
import { BaseCrudProxy } from "src/common/base-crud.proxy";
import { CategoryEntity } from "src/typeorm/entities/category.entity";
import { CommentsProxy } from '../../comments/models/comment.proxy';

//#endregion

/**
 * classe que representa as informações q são enviadas pra api sobre a categoria
 */
export class CategoryProxy extends BaseCrudProxy {
  
  //#region construtor

  /**
   * Construtor padrão
   */
  constructor (
    entity: CategoryEntity,
  ) {
    super(entity);

    this.name = entity.name;
    this.color = entity.color;
    this.comments = Array.isArray(entity.comments) && entity.comments.map(comment => new CommentsProxy(comment)) || [];

  }

  //#region public properties

  /**
   * Nome dessa categoria
   */
  @ApiProperty()
  name: string;

  /**
   * Clor dessa categoria
   */
  @ApiProperty()
  color: string;

  /**
   * Lista de comentários desta categoria
   */
  @ApiProperty( { type: () => CommentsProxy, isArray: true } )
  comments?: CommentsProxy[];

  //#endregion

}
