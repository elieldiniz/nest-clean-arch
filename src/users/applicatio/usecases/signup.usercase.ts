import { BadRequestError } from "../../../shared/application/erros/bad-requet-erros"
import { UserRepository } from "../../domain/repositorys/user.repository"
import { UserEntity } from "@/users/domain/entities/user.entity"
import {HashProviders} from "@/shared/application/providers/hash-provider"
import { UserOutput } from "../dtos/user-output"
import { UserCase as DefoultUseCase} from "@/shared/application/providers/usecase/use-case"
import { SignupDto } from "@/users/infrastructure/dto/signup.dto"


export namespace SignupUserCase{
  export type Input = {
    name: string
    email: string
    password: string
  }
  export type Output = UserOutput

  export class UserCase implements DefoultUseCase<Input, Output>{
    create(SignupDto: SignupDto) {
      throw new Error('Method not implemented.')
    }
y

    constructor(private userRepository: UserRepository.Repository,
      private hashProvider: HashProviders,
     ){

    }
    async execute(input: Input): Promise<Output> {
      const {email,name, password} = input

      if(!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
    }

    await this.userRepository.emailExists(email)

    const hashPassword = await this.hashProvider.generatedHash(password)

    const entity = new UserEntity(
      Object.assign(input , {password: hashPassword })
    )

    await this.userRepository.insert(entity)

    return entity.toJSON()
  }
}
}

