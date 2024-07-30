import { Entity } from "../entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>{

    items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findByID(id: string): Promise<E> {
    const _id = `${id}`
    const entities = this.items.find(items => items.id === id)
    if(!entities) {
      throw new Error('Entity not found')
    }
    return entities
  }

  findAll(): Promise<E[]> {
    return Promise.resolve([...this.items])
  }
  update(entity: E): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
