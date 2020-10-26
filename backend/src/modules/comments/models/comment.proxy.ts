//#region imports

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseCrudProxy } from "src/common/base-crud.proxy";
import { CategoryProxy } from "src/modules/categories/models/cateory.proxy";
import { CategoryEntity } from "src/typeorm/entities/category.entity";
import { CommentsEntity } from "src/typeorm/entities/comment.entity";

//#endregion

/**
 * classe que representa as informações q são enviadas pra api sobre a categoria
 */
export class CommentsProxy extends BaseCrudProxy {
  
  //#region construtor

  /**
   * Construtor padrão
   */
  constructor (
    entity: CommentsEntity,
  ) {
    super(entity);

    this.message = entity.message;
    this.personName = entity.personName;
    this.personEmoji = entity.personEmoji;
    this.personColor = entity.personColor;
    this.category = entity.category instanceof CategoryEntity && new CategoryProxy(entity.category) || void 0;

  }

  //#region public properties
  
  /**
   * Mensagem deste comentário
   */
  @ApiProperty()
  message: string;

  /**
   * O nome do autor deste comentário
   */
  @ApiProperty()
  personName: string;

  /**
   * Emoji que representa o autor deste comentário
   */
  @ApiProperty()
  personEmoji: string;

  /**
   * Cor de fundo da foto deste autor
   */
  @ApiProperty()
  personColor: string;

  /**
   * As informações da categoria deste comentário
   */
  @ApiPropertyOptional({ type: () => CategoryProxy })
  category?: CategoryProxy;

  //#endregion

}
