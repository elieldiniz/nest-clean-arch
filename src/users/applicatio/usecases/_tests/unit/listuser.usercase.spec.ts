import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { ListUserseCase } from "../../listUser.usercase"
import { SerchResult } from "@/shared/domain/repositories/searchble-repository-contracts"
import { UserRepository } from "@/users/domain/repositorys/user.repository"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"

describe('ListUsersUseCase unit tests', () => {
  let sut: ListUserseCase.UserCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new ListUserseCase.UserCase(repository)
  })

  it('toOutput method', () => {
    let result = new UserRepository.SerchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    let output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })

    const entity = new UserEntity(UserDataBuilder({}))
    result = new UserRepository.SerchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })
  })
})
