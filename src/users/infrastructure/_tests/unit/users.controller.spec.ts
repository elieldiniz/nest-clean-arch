
import { UsersController } from '../../users.controller';
import { UserOutput } from '@/users/applicatio/dtos/user-output';
import { SignupUserCase } from '@/users/applicatio/usecases/signup.usercase';
import { SignupDto } from '../../dto/signup.dto';
import { SigninUserCase } from '@/users/applicatio/usecases/signin.usercase';
import { SigninDto } from '../../dto/signin.dto';
import { UpdateUserUserCase } from '@/users/applicatio/usecases/updateuser.usercase';
import { UpadeteUserDtp } from '../../dto/upadate-user.dto';
import { UpdatePasswordDto } from '../../dto/upadate-password.dto';
import { UpadatePasswoerdUserCase } from '@/users/applicatio/usecases/upadate-password.usercase';
import { ListUserseCase } from '@/users/applicatio/usecases/listUser.usercase';



describe('UsersController unit test', () => {
  let sut: UsersController
  let id: string
  let props: UserOutput

  beforeEach(async () => {
    sut = new UsersController()
    id = '4d6709c1-11ff-4bd7-be58-12bdb1554113'
    props = {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    }
  })

  it('shoud be defined',()=>{
    expect(sut).toBeDefined()
  })

  it('should create a user', async () => {
    const output: SignupUserCase.Output = props
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['signupUseCase'] = mockSignupUseCase as any
    const input: SignupDto = {
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
    }
    const result = await sut.create(input)
    expect(output).toMatchObject(result)
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('should authenticate a user', async () => {
    const output: SigninUserCase.Output = props
    const mockSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['signinUseCase'] = mockSigninUseCase as any
    const input: SigninDto = {
      email: 'a@a.com',
      password: '1234',
    }
    const result = await sut.login(input)
    expect(output).toMatchObject(result)
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('should update a user', async () => {
    const output: UpdateUserUserCase.Output = props
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['updateUserUseCase'] = mockUpdateUserUseCase as any
    const input: UpadeteUserDtp = {
      name: 'new name',
    }
    const result = await sut.update(id, input)
    expect(output).toMatchObject(result)
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })


  it('should update user password ', async () => {
    const output: UpadatePasswoerdUserCase.Output = props


    const mockupdatePasswordUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }

    sut['updatePasswordUseCase'] = mockupdatePasswordUseCase as any

    const input: UpdatePasswordDto = {
      password: 'new password',
      oldPassword: 'old password'
    }
    const result = await sut.updatePassword(id, input)
    expect(output).toMatchObject(result)
    expect(mockupdatePasswordUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })

  it('should delete user  ', async () => {
    const output = undefined

    const mockupdatePasswordUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['deleteUserUseCase'] = mockupdatePasswordUseCase as any

    const result = await sut.remove(id)
    expect(output).toStrictEqual(result)
    expect(mockupdatePasswordUseCase.execute).toHaveBeenCalledWith({ id })
  })

  it('should get user  ', async () => {
    const output = props

    const mockGetUserCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['getUserUseCase'] = mockGetUserCase as any

    const result = await sut.findOne(id)

    expect(output).toMatchObject(result)
    expect(output).toStrictEqual(result)
    expect(mockGetUserCase.execute).toHaveBeenCalledWith({id})
  })

  it('should list users', async () => {
    const output: ListUserseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    }
    const mockListUsersUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['listUsersUseCase'] = mockListUsersUseCase as any
    const searchParams = {
      page: 1,
      perPage: 1,
    }
    const result = await sut.search(searchParams)
    expect(output).toStrictEqual(result)
    expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams)
  })
});
