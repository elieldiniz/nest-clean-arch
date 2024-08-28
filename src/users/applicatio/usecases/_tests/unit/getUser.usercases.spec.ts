import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { GetUserCase } from "../../getUser.usercase"
import { rejects } from "assert"
import { NotFoudError } from "@/shared/domain/erros/not-foud-erros"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
describe('UserInMemoryRepository unit tests', () => {
  let sut: GetUserCase.UserCase
  let repository: UserInMemoryRepository


  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new GetUserCase.UserCase(repository)
  })

  it('Should throws erros whtn entity not found', async () => {
    await expect(()=> sut.execute({id: 'fakerId'})).rejects.toThrow(
      new NotFoudError('Entity not found')
    )
  })

  it('Should be able to get user profile', async () => {
  const asypFindByID = jest.spyOn(repository, 'findByID')
  const items = [new UserEntity(UserDataBuilder({}))]
  repository.items = items

  const result = await sut.execute({id: items[0]._id})

  expect(asypFindByID).toHaveBeenCalledTimes(1)
  expect(result).toMatchObject({
    id: items[0]._id,
    name: items[0].name,
    email: items[0].email,
    password: items[0].password,
    createdAt: items[0].createdat,
  })
  })


})

