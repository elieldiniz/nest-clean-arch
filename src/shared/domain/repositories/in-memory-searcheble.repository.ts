
import { Entity } from "../entities/entity";
import { NotFoudError } from "../erros/not-foud-erros";
import { InMemoryRepository } from "./in-memory.repository";
import { RepositoryInterface } from "./repository-contracts";
import { SearchParams, SerchablsRepositoryInterface, SerchResult } from "./searchble-repository-contracts";

export abstract class InMemorySearchebleRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SerchablsRepositoryInterface<E, any, any>{


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
    ): Promise<E[]>{}

    protected async applyPaginate(
      items: E[],
      sort: SearchParams['page'],
      sortDir: SearchParams['perPage']

    ): Promise<E[]>{}

}
