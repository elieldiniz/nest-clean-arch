import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repository/user-in-memory.repository"
import { HashProviders } from "@/shared/application/providers/hash-provider"
import { BcriptjsHashProvider } from "@/users/infrastructure/providers/hash-provider/bcryptjs-hash.providers"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { BadRequestError } from "@/shared/application/erros/bad-requet-erros"
import { SigninUserCase } from "../../signin.usercase"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { NotFoundError } from "rxjs"
import { InvalidCredencialError } from "@/shared/application/erros/invalid-credentials-erros"
import { NotFoudError } from "@/shared/domain/erros/not-foud-erros"
describe('SigninUserCase unit tests', () => {
  let sut: SigninUserCase.UserCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProviders

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcriptjsHashProvider()
    sut = new SigninUserCase.UserCase(repository, hashProvider)
  })

  it('Should create a user', async () => {
    const spyfindByEmail = jest.spyOn(repository, 'findByEmail')
    const hashPassword = await hashProvider.generatedHash('1234')
    const entity = new UserEntity(UserDataBuilder({email: 'elie@diniz.com',password: hashPassword}))
    repository.items = [entity]

    const result = await sut.execute({
      email: entity.email,
      password: '1234',
    })

    expect(spyfindByEmail).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(entity.toJSON())
  })

  it('Should throws error when email not provided', async () => {
    const props = { email: null, password: '1234' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when password not provided', async () => {
    const props = { email: 'elie@diniz.com', password: null }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should not be able authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({ email: 'elie@diniz.com', password: '1234' }),
    ).rejects.toBeInstanceOf(NotFoudError)
  })

  it('Should not be able to autenticate with wrong password', async () =>{
    const hashPassword = await hashProvider.generatedHash('1234')
    const entity = new UserEntity(
      UserDataBuilder({email: 'elie@diniz.com',password: hashPassword}
      ))

    repository.items = [entity]

    const props = { email: 'elie@diniz.com', password: 'fake' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      InvalidCredencialError,
    )
  })


})
