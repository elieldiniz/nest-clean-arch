import { Entity } from "@/shared/domain/entities/entity"
import { SerchResult } from "@/shared/domain/repositories/searchble-repository-contracts"

export type paginationOutput<item = any> = {
  item: item[]
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}

export class PaginationOutputMapper{
  static toOutput<item = any>(items: item[],result: SerchResult<Entity>): paginationOutput<item>{
    return {
      item: items,
      total: result.total,
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    }
  }
}
