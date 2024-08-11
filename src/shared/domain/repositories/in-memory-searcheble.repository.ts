
import { Entity } from "../entities/entity";
import { NotFoudError } from "../erros/not-foud-erros";
import { InMemoryRepository } from "./in-memory.repository";
import { RepositoryInterface } from "./repository-contracts";
import { SearchParams, SerchablsRepositoryInterface, SerchResult } from "./searchble-repository-contracts";

export abstract class InMemorySearchebleRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SerchablsRepositoryInterface<E, any, any>{


    sortableFields: string[] = []

    seaech(props: any): Promise<SerchResult<E, any>> {
      throw new Error("Method not implemented.");
    }

    async search(props: SearchParams): Promise<SerchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir,
    )
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage,
    )
    return new SerchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDir,
      filter: props.filter,
    })

    }

    protected abstract applyFilter(
      item: E[],
      filter: string | null
    ): Promise<E[]>

    protected async applySort(
      items: E[],
      sort: string | null,
      sortDir: string | null,
    ): Promise<E[]>{

      if(!sort || !this.sortableFields.includes(sort)){
        return items
      }
      return [...items].sort((a,b)=> {
        if(a.props[sort] < b.props[sort]){
          return sortDir === 'asc'? -1 : 1
        }

        if(b.props[sort] < a.props[sort]){
          return sortDir === 'asc'? 1 : -1
        }

        return 0

      })
    }

    protected async applyPaginate(
      items: E[],
      page: SearchParams['page'],
      perPage: SearchParams['perPage']

    ): Promise<E[]>{
      const start = (page - 1) * perPage
      const limit = start + perPage
      return items.slice(start, limit)
    }
}
