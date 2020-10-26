//#region Imports

import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/typeorm/entities/category.entity";
import { isValid } from "src/utils/functions";
import { Like, Repository } from "typeorm";
import { CreateCategoryPayload } from "../models/create-category.payload";
import { PaginatedCategoryProxy } from "../models/paginated-category.proxy";

//#endregion

/**
 * Classe que representa o serviço que lida com as categirias
 */
@Injectable()
export class CategoryService {

//#region construtor

/**
 * construtor padrão
 */
constructor (
  @InjectRepository(CategoryEntity)
  public readonly repository: Repository<CategoryEntity>
) { }

//#endregion

//#region private properties

/**
 * A quantidade maxima de itens por paginação
 * 
 * @private
 */
private readonly maxItensPerPage = 100;

/**
 * A quantidade minima de itens por paginação
 * 
 * @private
 */
private readonly minItensPerPage = 5;

//#endregion

//#region Crud Methods

/**
 * Metodo que retorna uma lista com as entidades
 * 
 * @param currentPage Página atual
 * @param maxItens Numero maximo de itens
 * @param search O termo para pesquisa de uma categoria
 */
public async listMany(currentPage: number, maxItens: number, search?: string): Promise<PaginatedCategoryProxy> {
  currentPage = Math.max(1, currentPage)
  maxItens = Math.max(this.minItensPerPage, Math.min(this.maxItensPerPage, maxItens))

  let query = this.repository.createQueryBuilder('category');

  if(search){
    query = query.where( 'LOWER(category.name) LIKE :search', { search: `%${search.toLowerCase()}%` }) 
  }

  const [entities, total] = await query
  .take(maxItens)
  .skip( (currentPage - 1) * maxItens )
  .orderBy('name', 'ASC')
  .getManyAndCount();

  const pageCount = Math.ceil(total / maxItens);

  return new PaginatedCategoryProxy(
    entities,
    currentPage,
    pageCount,
    maxItens
  );
}

/**
 * Metodo que retorna as informações da entidade
 * 
 * @param entityId A identificação da entidade q está sendo procurada
 */
public async get(entityId: number): Promise<CategoryEntity> {

  const entity = await this.repository.findOne({
     where:{ 
       id: Number(entityId) || 0,
      },
    });

  if (!entity) {
    throw new ForbiddenException('A categoria que você procura não existe ou foi removida.')
  }
  return entity
}

/**
 * Metodo que cria uma entidade
 * 
 * @param payload As informações para a criação
 */
public async create(payload: CreateCategoryPayload): Promise<CategoryEntity> {
  const entity = this.getEntityFromPayload(payload);

  return await this.repository.save(entity);
}

//#endregion

//#region private methods

private getEntityFromPayload(payload: CreateCategoryPayload): CategoryEntity {
  return new CategoryEntity( {
    ...isValid(payload.name) && {name: payload.name},
    ...isValid(payload.color) && { color: payload.color },
  })
}

//#endregion

}