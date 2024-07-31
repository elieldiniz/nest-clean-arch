import { NotFoudError } from "@/shared/domain/erros/not-foud-erros";
import { InMemorySearchebleRepository } from "@/shared/domain/repositories/in-memory-searcheble.repository";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositorys/user.repository";

export class UserInMemoryRepository extends InMemorySearchebleRepository<UserEntity> implements UserRepository{
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

}
