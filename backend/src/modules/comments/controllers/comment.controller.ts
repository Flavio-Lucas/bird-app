//#region imports

import { Body, Controller, Get, NotFoundException, Param, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CommentsProxy } from "../models/comment.proxy";
import { CreateCommentPayload } from "../models/create-comment.payload";
import { PaginatedCommentProxy } from "../models/paginated-comment.proxy";
import { CommentsService } from "../services/comment.service";

//#endregion

/**
 * classe que representa o controller que lida com os comentários
 */
@UseInterceptors()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {

  //#region constructor
  
  /**
   * Construtor padrão
   */
  constructor (
    private readonly service: CommentsService
  ) { }

  //#endregion

  //#region public methods

  /**
   * Metodo que retorna varias informações da entidade
   * 
   * @param page A página atual
   * @param maxItens A quantidade maxima de itens
   * @param search o termo para pesquisa em uma categoria
   */
  @Get()
  @ApiOperation({ summary: 'Metodo que retorna uma lista de comentários' })
  @ApiOkResponse({ type: PaginatedCommentProxy })
  @ApiQuery({ name: 'page', required: false, example: 1, allowEmptyValue: false, description: 'A página atual da paginação' })
  @ApiQuery({ name: 'maxItens', required: false, example: 15, allowEmptyValue: false, description: 'A quantidade de itens a ser retornada por página. Min.: 5, Max.: 100' })
  @ApiQuery({ name: 'search', required: false, example: 'Typescript', allowEmptyValue: false, description: 'Valor de pesquisa caso seja necesário' })
  @ApiQuery({ name: 'categoryId', required: false, example: 1, allowEmptyValue: false, description: 'filtrar comentários feitos apenas desta categoria' })
  @ApiQuery({ name: 'includeCategory', required: false, example: true, allowEmptyValue: false, description: 'diz se deve incluir as informações da categoria no comentário' })
  public async getMany(
    @Query('page') page?: number,
    @Query('maxItens') maxItens?: number,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: number,
    @Query('includeCategory') includeCategory?: boolean,
  ):Promise<PaginatedCommentProxy> {
    page = Number(page) || 1;
    maxItens = Number(maxItens) || 15;
    categoryId = Number(categoryId) || 15;
    includeCategory = Boolean(includeCategory) || false;

    return await this.service.listMany(page, maxItens, search, categoryId, includeCategory);
  }

  /**
   * Metodo que retorna varias informações da entidade
   * 
   * @param categoryId 
   */
  @Get(':commentId')
  @ApiOperation({ summary: 'Metodo que retorna uma comentários com base na sua identificação' })
  @ApiOkResponse({ type: CommentsProxy })
  @ApiNotFoundResponse({ type: NotFoundException, description: 'A categoria que você procura não foi encontrada'})
  @ApiQuery({ name: 'page', required: false, example: 1, allowEmptyValue: false, description: 'A página atual da paginação' })
  @ApiQuery({ name: 'maxItens', required: false, example: 15, allowEmptyValue: false, description: 'A quantidade de itens a ser retornada por página. Min.: 5, Max.: 100' })
  @ApiQuery({ name: 'categoryId', required: false, example: 'Typescript', allowEmptyValue: false, description: 'A identificação de uma categoria' })
  public async getOne(@Query('categoryId') categoryId: number):Promise<CommentsProxy> {
    return await this.service.get(categoryId).then(response => new CommentsProxy(response));
  }

  /**
   * Metodo que cria um comentário
   * 
   * @param payload As informações de um comentário
   */
  @Post()
  @ApiOperation({ summary: 'Metodo que cria uma comentário'})
  @ApiOkResponse({ type: CommentsProxy })
  public async createOne(@Body() payload: CreateCommentPayload): Promise<CommentsProxy> {
    return await this.service.create(payload).then(response => new CommentsProxy(response));
  }

  //#endregion
}
