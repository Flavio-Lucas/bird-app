//#region imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsHexColor, IsString, MaxLength } from 'class-validator';

//#endregion

/**
 * classe que representa o payload enviado para criar uma categoria
 */
export class CreateCategoryPayload {

  /**
   * O nome dessa categoria
   */
  @ApiProperty()
  @IsDefined({ message: 'É nessessário enviar o nome da categoria' })
  @IsString({ message: 'O nome deve ser um texto' })
  @MaxLength(64, { message: 'o nome da caregoria não pode exceder 64 caracteres' })
  name: string;

  /**
   * O nome dessa categoria
   */
  @ApiProperty()
  @IsDefined({ message: 'É nessessário enviar a cor da categoria' })
  @IsString({ message: 'A cor deve ser um texto hexadecimal' })
  @IsHexColor({ message: 'É necessário enviar um HEX válido para a cor da categoria' })
  color: string;

}
