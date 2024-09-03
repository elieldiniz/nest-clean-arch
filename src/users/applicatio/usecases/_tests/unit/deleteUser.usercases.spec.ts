import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { GetUserCase } from "../../getUser.usercase"
import { rejects } from "assert"
import { NotFoudError } from "@/shared/domain/erros/not-foud-erros"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { DeleteUserUserCase } from "../../deleteUser.usercase"
describe('UserInMemoryRepository unit tests', () => {
  let sut: DeleteUserUserCase.UserCase

  let repository: UserInMemoryRepository


  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new DeleteUserUserCase.UserCase(repository)
  })

  it('Should throws erros whtn entity not found', async () => {
    await expect(()=> sut.execute({id: 'fakerId'})).rejects.toThrow(
      new NotFoudError('Entity not found')
    )
  })

  it('Should delete a user', async () => {
  const asyDelete = jest.spyOn(repository, 'delete')
  const items = [new UserEntity(UserDataBuilder({}))]
  repository.items = items

  await sut.execute({id: items[0].id})

  expect(asyDelete).toHaveBeenCalledTimes(1)

  expect(repository.items).toHaveLength(0)

  })


})

