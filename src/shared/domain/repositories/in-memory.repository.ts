import { Entity } from "../entities/entity";
import { NotFoudError } from "../erros/not-foud-erros";
import { RepositoryInterface } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>{

    items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findByID(id: string): Promise<E> {
   return this._get(id)
  }

  findAll(): Promise<E[]> {
    return Promise.resolve([...this.items])
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id)
    const index = this.items.findIndex(item => item.id === entity.id)
    this.items[index] = entity
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    this.items.splice(index, 1)
  }

  async _get(id: string): Promise<E> {
    const _id = `${id}`
    const entities = this.items.find(items => items.id === id)
    if(!entities) {
      throw new NotFoudError('Entity not found')
    }
    return entities
  }


}
