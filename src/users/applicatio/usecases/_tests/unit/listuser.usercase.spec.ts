import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { ListUserseCase } from "../../listUser.usercase"
import { SerchResult } from "@/shared/domain/repositories/searchble-repository-contracts"

describe('ListUserCase', () => {


   let sut: ListUserseCase.UserCase
  let repository: UserInMemoryRepository


  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new ListUserseCase.UserCase(repository)
  })

  it('toOutput map', () => {
    const result = new UserInMemoryRepository.SerchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir:null,
      filter: 'null',
    })
    const output = sut['toOutput'](result)


    expect(sut).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })
    console.log(sut)
  })
})
