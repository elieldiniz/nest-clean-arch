
import { Entity } from "../entities/entity";
import { NotFoudError } from "../erros/not-foud-erros";
import { InMemoryRepository } from "./in-memory.repository";
import { RepositoryInterface } from "./repository-contracts";
import { SearchParams, SerchablsRepositoryInterface, SerchResult } from "./searchble-repository-contracts";

export abstract class InMemorySearchebleRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SerchablsRepositoryInterface<E, any, any>{


    seaech(props: SearchParams): Promise<SerchResult<E>> {
      throw new Error('erro')
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
