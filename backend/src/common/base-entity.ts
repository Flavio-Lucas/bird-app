//#region imports

import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//#endregion

/**
 * A classe base para toda a entidade
 */
export class BaseEntity {
  
  /**
   * A identificação da entidade
   */
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  /**
   * Data de quando foi criada essa etidade
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * a data de quando foi atualizado pela ultima vez
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}