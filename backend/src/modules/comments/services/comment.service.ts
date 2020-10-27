//#region Imports

import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsEntity } from "src/typeorm/entities/comment.entity";
import { isValid } from "src/utils/functions";
import { Repository } from "typeorm";
import { CreateCommentPayload } from "../models/create-comment.payload";
import { PaginatedCommentProxy } from "../models/paginated-comment.proxy";

//#endregion

/**
 * Classe que representa o serviço que lida com as categirias
 */
@Injectable()
export class CommentsService {

//#region construtor

/**
 * construtor padrão
 */
constructor (
  @InjectRepository(CommentsEntity)
  public readonly repository: Repository<CommentsEntity>
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
 * @param categoryId O identificador da categoria
 */
public async listMany(currentPage: number, maxItens: number, search: string, categoryId: number, includeCategory: boolean): Promise<PaginatedCommentProxy> {
  currentPage = Math.max(1, currentPage)
  maxItens = Math.max(this.minItensPerPage, Math.min(this.maxItensPerPage, maxItens))

  let query = this.repository.createQueryBuilder('comments');

  if(search){
    query = query.where( 'LOWER(comments.message) LIKE :search', { search: `%${search.toLowerCase()}%` });
  }

  if(categoryId){
    query = query.andWhere( 'comments.categoryId = :categoryId', { categoryId });
  }

  if(includeCategory){
    query = query.leftJoinAndSelect('comments.category', 'category');
  }

  const [entities, total] = await query
  .take(maxItens)
  .skip( (currentPage - 1) * maxItens )
  .orderBy('comments.createdAt', 'DESC')
  .getManyAndCount();

  const pageCount = Math.ceil(total / maxItens);

  return new PaginatedCommentProxy(
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
public async get(entityId: number): Promise<CommentsEntity> {

  const entity = await this.repository.findOne({
     where:{ 
       id: Number(entityId) || 0,
      },
    });

  if (!entity) {
    throw new ForbiddenException('O comentário que você procura não existe ou foi removido.')
  }
  return entity
}

/**
 * Metodo que cria uma entidade
 * 
 * @param payload As informações para a criação
 */
public async create(payload: CreateCommentPayload): Promise<CommentsEntity> {
  const entity = this.getEntityFromPayload(payload);

  return await this.repository.save(entity);
}

//#endregion

//#region private methods

/**
 * Metodo que pega as informações para a entidade a partir do payload
 * 
 * @param payload 
 */
private getEntityFromPayload(payload: CreateCommentPayload): CommentsEntity {
  return new CommentsEntity( {
    ...isValid(payload.message) && {message: payload.message},
    ...isValid(payload.personName) && { personName: payload.personName },
    ...isValid(payload.personEmoji) && { personEmoji: payload.personEmoji},
    ...isValid(payload.personColor) && { personColor: payload.personColor},
    ...isValid(payload.categoryId) && { categoryId: payload.categoryId},
  })
}

//#endregion

}