//#region imports

import { Body, Controller, Get, NotFoundException, Param, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CategoryProxy } from "../models/cateory.proxy";
import { CreateCategoryPayload } from "../models/create-category.payload";
import { PaginatedCategoryProxy } from "../models/paginated-category.proxy";
import { CategoryService } from "../services/cateory.service";

//#endregion

/**
 * classe que representa o controller que lida com as categorias
 */
@UseInterceptors()
@ApiTags('categories')
@Controller('categories')
export class CategoryController {

  //#region constructor
  
  /**
   * Construtor padrão
   */
  constructor (
    private readonly service: CategoryService
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
  @ApiOperation({ summary: 'Metodo que retorna uma lista de categorias' })
  @ApiOkResponse({ type: PaginatedCategoryProxy })
  @ApiQuery({ name: 'page', required: false, example: 1, allowEmptyValue: false, description: 'A página atual da paginação' })
  @ApiQuery({ name: 'maxItens', required: false, example: 15, allowEmptyValue: false, description: 'A quantidade de itens a ser retornada por página. Min.: 5, Max.: 100' })
  @ApiQuery({ name: 'search', required: false, example: 'Typescript', allowEmptyValue: false, description: 'o termo para pesquisa em uma categoria' })
  public async getMany(@Query('page') page?: number, @Query('maxItens') maxItens?: number, @Query('search') search?: string):Promise<PaginatedCategoryProxy> {
    page = Number(page) || 1;
    maxItens = Number(maxItens) || 15;

    return await this.service.listMany(page, maxItens, search);
  }

  /**
   * Metodo que retorna varias informações da entidade
   * 
   * @param categoryId 
   */
  @Get('/:categoryId')
  @ApiOperation({ summary: 'Metodo que retorna uma categoria com base na sua identificação' })
  @ApiOkResponse({ type: CategoryProxy })
  @ApiNotFoundResponse({ type: NotFoundException, description: 'A categoria que você procura não foi encontrada'})
  public async getOne(@Param('categoryId') categoryId: number):Promise<CategoryProxy> {
    return await this.service.get(categoryId).then(response => new CategoryProxy(response));
  }
  
  /**
   * 
   * @param payload 
   */
  @Post()
  @ApiOperation({ summary: 'Metodo que cria uma categoria'})
  @ApiOkResponse({ type: CategoryProxy })
  public async createOne(@Body() payload: CreateCategoryPayload): Promise<CategoryProxy> {
    return await this.service.create(payload).then(response => new CategoryProxy(response));
  }

  //#endregion
}
