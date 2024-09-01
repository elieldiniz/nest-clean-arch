import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { rejects } from "assert"
import { NotFoudError } from "@/shared/domain/erros/not-foud-erros"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { GetUserCase } from "../../getUser.usercase"
import { UpdateUserUserCase } from "../../updateuser.usercase"
import { BadRequestError } from "@/shared/application/erros/bad-requet-erros"
describe('UpadatUserUserCase unit tests', () => {
  let sut: UpdateUserUserCase.UserCase
  let repository: UserInMemoryRepository


  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UpdateUserUserCase.UserCase(repository)
  })

  it('Should throws erros whtn entity not found', async () => {
    await expect(()=>
      sut.execute({id: 'fakerId', name: 'test'})).rejects.toThrow(
      new NotFoudError('Entity not found')
    )
  })

  it('Should throws erros whtn name not provided', async () => {
    await expect(()=>
      sut.execute({id: 'fakerId', name: ''})).rejects.toThrow(
      new BadRequestError('name not provided')
    )
  })

  it('Should update a user', async () => {
  const asyUpadate = jest.spyOn(repository, 'update')
  const items = [new UserEntity(UserDataBuilder({}))]
  repository.items = items

  const result = await sut.execute({id: items[0]._id, name:'new name' })

  expect(asyUpadate).toHaveBeenCalledTimes(1)
  expect(result).toMatchObject({
    id: items[0]._id,
    name: 'new name',
    email: items[0].email,
    password: items[0].password,
    createdAt: items[0].createdat,
  })
  })


})

