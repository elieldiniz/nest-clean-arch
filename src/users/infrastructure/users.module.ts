import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SigninUserCase } from '../applicatio/usecases/signin.usercase';
import { UserInMemoryRepository } from './database/in-memory/repository/user-in-memory.repository';
import { BcriptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.providers';
import { UserRepository } from '../domain/repositorys/user.repository';
import { HashProviders } from '@/shared/application/providers/hash-provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService,
  {
    provide: 'UserRepository',
    useClass: UserInMemoryRepository
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
  }]

})
export class UsersModule {}
