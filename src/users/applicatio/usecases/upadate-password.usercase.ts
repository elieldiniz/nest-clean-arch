
import { BadRequestError } from "@/shared/application/erros/bad-requet-erros"
import { UserRepository } from "../../domain/repositorys/user.repository"
import { UserOutput, UserOutputMapper } from "../dtos/user-output"
import { UserCase as DefoultUseCase} from "@/shared/application/providers/usecase/use-case"
import { InvalidPasswordError } from "@/shared/application/erros/invalid-password-error"
import { HashProviders } from "@/shared/application/providers/hash-provider"

export namespace UpadatePasswoerdUserCase{
  export type Input = {
    id: string
    password: string
    oldPassword: string
  }

  export type  Output = UserOutput

  export class UserCase implements DefoultUseCase<Input, Output> {
    //Injeção de userRepository

    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProviders
     ){

    }

    async execute(input: Input): Promise<Output> {

        const entity = await this.userRepository.findByID(input.id)
        if (!input.oldPassword ||!input.password) {
                  throw new InvalidPasswordError('Old password and new password is required')
        }
        const checkOldPassword = await this.hashProvider.compareHash(
          input.oldPassword, entity.password)
        if (!checkOldPassword) {
            throw new InvalidPasswordError('Old password does not match')
        }

        const hashPassword = await this.hashProvider.generatedHash(input.password)


        entity.updatPassword(hashPassword)
        await this.userRepository.update(entity)
       return UserOutputMapper.toOutput(entity)
    }

  }
}


