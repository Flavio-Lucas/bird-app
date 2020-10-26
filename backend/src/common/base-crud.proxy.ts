//#region imports

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "./base-entity";

//#endregion

/**
 * a classe base para todo proxy
 */
export class BaseCrudProxy {

  //#region construtor

  /**
   * construtor padrão
   */
  constructor (
    private readonly entity: BaseEntity,
  ) {
  
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  //#endregion

  //#region public properties
  
  /**
   * A identificação da entidade
   */
  @ApiProperty()
  id: number;

  /**
   * Data de quando foi criada essa etidade
   */
  @ApiProperty()
  createdAt: Date;

  /**
   * a data de quando foi atualizado pela ultima vez
   */
  @ApiProperty()
  updatedAt: Date;

  //#endregion
}