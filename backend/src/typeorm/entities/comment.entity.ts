//#region Imports

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from '../../common/base-entity';
import { CategoryEntity } from "./category.entity";

//#endregion

/**
 * A classe que representa a entidade q lida com as informações dos comentários
 */

 @Entity('comments')
 export class CommentsEntity extends BaseEntity {

  //#region Construtor 

  /**
   * Construtor padrão
   */
  constructor(
    partial: Partial<CommentsEntity> | CommentsEntity,
  ) {
    super();
    Object.assign(this, { ... partial });
  }
  
  //#endregion

  //#region public properties
  
  /**
   * Mensagem deste comentário
   */
  @Column({length: 1024, nullable: false})
  @ApiProperty()
  message: string;

  /**
   * O nome do autor deste comentário
   */
  @Column({length: 64, nullable: false})
  @ApiProperty()
  personName: string;

  /**
   * Emoji que representa o autor deste comentário
   */
  @Column({length: 128, nullable: false})
  @ApiProperty()
  personEmoji: string;

  /**
   * Cor de fundo da foto deste autor
   */
  @Column({length: 7, nullable: false})
  @ApiProperty()
  personColor: string;
  
  /**
   * Identificador da categoria a qual pertence este comentário
   */
  @Column({nullable: false})
  @ApiProperty()
  categoryId: number;

  /**
   * As informações da categoria deste comentário
   */
  @ApiPropertyOptional({ type: () => CategoryEntity })
  @ManyToOne( () => CategoryEntity, category => category.comments )
  category?: CategoryEntity;

  //#endregion

 }
 