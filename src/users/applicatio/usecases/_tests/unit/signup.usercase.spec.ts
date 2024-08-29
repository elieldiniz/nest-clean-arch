import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { SignupUserCase } from "../../signup.usercase"
import { HashProviders } from "@/shared/application/providers/hash-provider"
import { BcriptjsHashProvider } from "@/users/infrastructure/providers/hash-provider/bcryptjs-hash.providers"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { ConflictErro } from "@/shared/domain/erros/conflict-erros copy"
import { BadRequestError } from "@/shared/application/erros/bad-requet-erros"
describe('UserInMemoryRepository unit tests', () => {
  let sut: SignupUserCase.UserCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProviders

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcriptjsHashProvider()
    sut = new SignupUserCase.UserCase(repository, hashProvider)
  })

  it('Should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = UserDataBuilder({})
    const result = await sut.execute({
      name: props.name,
      email: props.email,
      password: props.password,
    })
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('Should not be able to register with same email twice', async () => {
    const props = UserDataBuilder({ email: 'a@a.com' })
    await sut.execute(props)

    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConflictErro)
  })

  it('Should throws error when name not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { name: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when email not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { email: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when password not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { password: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
