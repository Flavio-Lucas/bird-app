//#region Imports

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from '../../common/base-entity';
import { CommentsEntity } from "./comment.entity";

//#endregion

/**
 * A classe que representa a entidade q lida com as informações da categoria
 */

 @Entity('categories')
 export class CategoryEntity extends BaseEntity {
  //#region Construtor 
  /**
   * Construtor padrão
   */
  constructor(
    partial: Partial<CategoryEntity> | CategoryEntity,
  ) {
    super();
    Object.assign(this, { ... partial });
  }
  
  //#endregion

  //#region public properties

  /**
   * Nome dessa categoria
   */
  @Column({length: 64, nullable: false})
  @ApiProperty()
  name: string;

  /**
   * Clor dessa categoria
   */
  @Column({length: 7, nullable: false})
  @ApiProperty()
  color: string;

  /**
   * Lista de comentários desta categoria
   */
  @ApiProperty( { type: () => CommentsEntity, isArray: true } )
  @OneToMany( () => CommentsEntity, comments => comments.categoryId )
  comments?: CommentsEntity[];

  //#endregion
}
 