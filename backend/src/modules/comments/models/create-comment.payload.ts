//#region imports

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsHexColor, IsNumber, IsString, MaxLength } from 'class-validator';

//#endregion

/**
 * classe que representa o payload enviado para criar uma categoria
 */
export class CreateCommentPayload {

  /**
   * Mensagem deste comentário
   */
  @ApiProperty()
  @IsDefined({ message: 'É nessessário algo no comentário' })
  @IsString({ message: 'O comentário deve ser um texto' })
  @MaxLength(1024, { message: 'o Comentário não pode exceder 1024 caracteres' })
  message: string;

  /**
   * O nome do autor deste comentário
   */
  @ApiProperty()
  @IsDefined({ message: 'É nessessário enviar o nome do autor' })
  @IsString({ message: 'O nome do autor deve ser um texto' })
  @MaxLength(64, { message: 'o nome do autor não pode exceder 64 caracteres' })
  personName: string;

  /**
   * Emoji que representa o autor deste comentário
   */
  @ApiProperty()
  @IsDefined({ message: 'É nessessário enviar o link do emoji da categoria' })
  @IsString({ message: 'O link do emoji deve ser um texto' })
  @MaxLength(128, { message: 'o link do emoji não pode exceder 128 caracteres' })
  personEmoji: string;

  /**
   * Cor de fundo da foto deste autor
   */
  @ApiProperty()
  @IsDefined({ message: 'É nessessário enviar a cor do autor' })
  @IsString({ message: 'A cor deve ser um texto' })
  @IsHexColor({ message: 'É necessário enviar um HEX válido para a cor da categoria' })
  personColor: string;
  
  /**
   * Identificador da categoria a qual pertence este comentário
   */
  @ApiProperty()
  @IsDefined({ message: 'É nessessário enviar a identificação da categoria' })
  @IsNumber({}, {message: 'A identificação da categoria deve ser um numero'})
  categoryId: number;

}
