import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { SigninUserCase } from '../applicatio/usecases/signin.usercase';
import { UserInMemoryRepository } from './database/in-memory/repository/user-in-memory.repository';
import { BcriptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.providers';
import { UserRepository } from '../domain/repositorys/user.repository';
import { HashProviders } from '@/shared/application/providers/hash-provider';
import { SignupUserCase } from '../applicatio/usecases/signup.usercase';
import { GetUserCase } from '../applicatio/usecases/getUser.usercase';
import { ListUserseCase } from '../applicatio/usecases/listUser.usercase';
import { UpdateUserUserCase } from '../applicatio/usecases/updateuser.usercase';
import { UpadatePasswoerdUserCase } from '../applicatio/usecases/upadate-password.usercase';
import { DeleteUserUserCase } from '../applicatio/usecases/deleteUser.usercase';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { UserPrismaRepository } from './database/prisma/repositories/user-prisma-repository';

@Module({
  controllers: [UsersController],
  providers: [
  {
    provide: 'PrismaService',
    useClass: PrismaService
  },
  {
    provide: 'UserRepository',
    useFactory: (prismaService:PrismaService) => {
      return new UserPrismaRepository(prismaService)
    },
    inject: ['PrismaService']
  },
  {
    provide: 'HashProviders',
    useClass: BcriptjsHashProvider
  },
  {
    provide: SigninUserCase.UserCase,
    useFactory: (
      userRepository: UserRepository.Repository,
      hashProvider: HashProviders
    )=>{
      return new SigninUserCase.UserCase(userRepository, hashProvider)
    },
    inject: ['UserRepository','HashProviders']
  },
  {
    provide: SignupUserCase.UserCase,
    useFactory: (
      userRepository: UserRepository.Repository,
      hashProvider: HashProviders
    )=>{
      return new SignupUserCase.UserCase(userRepository, hashProvider)
    },
    inject: ['UserRepository','HashProviders']
  },
  {
    provide: GetUserCase.UserCase,
    useFactory: (
      userRepository: UserRepository.Repository,
    )=>{
      return new GetUserCase.UserCase(userRepository)
    },
    inject: ['UserRepository']
  },
  {
    provide: ListUserseCase.UserCase,
    useFactory: (
      userRepository: UserRepository.Repository,
    )=>{
      return new ListUserseCase.UserCase(userRepository)
    },
    inject: ['UserRepository']
  },
  {
    provide: UpdateUserUserCase.UserCase,
    useFactory: (
      userRepository: UserRepository.Repository,
    )=>{
      return new UpdateUserUserCase.UserCase(userRepository)
    },
    inject: ['UserRepository']
  },
  {
    provide: UpadatePasswoerdUserCase.UserCase,
    useFactory: (
      userRepository: UserRepository.Repository,
      hashProvider: HashProviders
    )=>{
      return new UpadatePasswoerdUserCase.UserCase(userRepository, hashProvider)
    },
    inject: ['UserRepository','HashProviders']
  },
  {
    provide: DeleteUserUserCase.UserCase,
    useFactory: (
      userRepository: UserRepository.Repository,
    )=>{
      return new DeleteUserUserCase.UserCase(userRepository)
    },
    inject: ['UserRepository']
  }
]

})
export class UsersModule {}
