
import { Entity } from "../entities/entity";
import { NotFoudError } from "../erros/not-foud-erros";
import { InMemoryRepository } from "./in-memory.repository";
import { RepositoryInterface } from "./repository-contracts";
import { SerchablsRepositoryInterface } from "./searchble-repository-contracts";

export abstract class InMemorySearchebleRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SerchablsRepositoryInterface<E, any, any>{


    seaech(props: any): Promise<any> {
      throw new Error('erro')
    }

}
