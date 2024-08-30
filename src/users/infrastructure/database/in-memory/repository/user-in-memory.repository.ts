import { UserRepository } from '@/users/domain/repositorys/user.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { NotFoudError } from '@/shared/domain/erros/not-foud-erros'
import { ConflictErro } from '@/shared/domain/erros/conflict-erros copy'
import { InMemorySearchebleRepository } from '@/shared/domain/repositories/in-memory-searcheble.repository'
import { SortDirection } from '@/shared/domain/repositories/searchble-repository-contracts'


export class UserInMemoryRepository
  extends InMemorySearchebleRepository<UserEntity>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'createdAt']
  items: any
  static SerchResult: any

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoudError(`Entity not found using email ${email}`)
    }
    return entity
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictErro('Email address already used')
    }
  }

  protected async applyFilter(
    items: UserEntity[],
    filter: UserRepository.Filter,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: UserEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<UserEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir)
  }
}
