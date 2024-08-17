import { NotFoudError } from "@/shared/domain/erros/not-foud-erros";
import { InMemorySearchebleRepository } from "@/shared/domain/repositories/in-memory-searcheble.repository";
import { SortDirection } from "@/shared/domain/repositories/searchble-repository-contracts";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositorys/user.repository";

export class UserInMemoryRepository extends InMemorySearchebleRepository<UserEntity> implements UserRepository.Repository{
  sortablefilders: string[] = ['name', 'createdAt']

  async findByEmail(email: string): Promise<UserEntity> {

      const entities = this.items.find(items => items.email === email)
      if(!entities) {
        throw new NotFoudError(`Entity not found using Email ${email}`)
      }
      return entities

  }

   async emailExists(email: string): Promise<void> {
    const entities = this.items.find(items => items.email === email)
    if(entities) {
      throw new NotFoudError(`Email address already used ${email}`)
    }

  }

  protected async applyFilter(item: UserEntity[],
    filter: UserRepository.Filter): Promise<UserEntity[]> {
    if (!filter) {
      return this.items
    }
    return item.filter (items => {
      return items.name.toLocaleLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: UserEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<UserEntity[]> {
    return !sort  ? super.applySort(items, 'createdAt', 'desc')
                  : super.applySort(items, sort, sortDir)
  }
}
