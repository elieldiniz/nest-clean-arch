import { BadRequestError } from "../../../shared/application/erros/bad-requet-erros"
import { UserRepository } from "../../domain/repositorys/user.repository"
import {HashProviders} from "@/shared/application/providers/hash-provider"
import { UserOutput, UserOutputMapper } from "../dtos/user-output"
import { UserCase as DefoultUseCase} from "@/shared/application/providers/usecase/use-case"
import { InvalidCredencialError } from "@/shared/application/erros/invalid-credentials-erros"


export namespace SigninUserCase{
  export type Input = {
    email: string
    password: string
  }
  export type Output = UserOutput

  export class UserCase implements DefoultUseCase<Input, Output>{
    //Injeção de userRepository

    constructor(private userRepository: UserRepository.Repository,
      private hashProvider: HashProviders,
     ){

    }
    async execute(input: Input): Promise<Output> {
      const {email, password} = input

      if(!email  || !password) {
        throw new BadRequestError('Input data not provided')
    }

    const entity = await this.userRepository.findByEmail(email)

    const hashPasswordMatches = await this.hashProvider.compareHash(
      password,
      entity.password)

      if(!hashPasswordMatches) {
        throw new InvalidCredencialError('Invalid credentials')
    }
    return UserOutputMapper.toOutput(entity)
  }
}
}

