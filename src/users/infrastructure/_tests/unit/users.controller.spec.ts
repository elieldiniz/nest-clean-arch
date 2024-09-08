
import { UsersController } from '../../users.controller';
import { UserOutput } from '@/users/applicatio/dtos/user-output';
import { SignupUserCase } from '@/users/applicatio/usecases/signup.usercase';
import { SignupDto } from '../../dto/signup.dto';
import { SigninUserCase } from '@/users/applicatio/usecases/signin.usercase';
import { SigninDto } from '../../dto/signin.dto';



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
});
