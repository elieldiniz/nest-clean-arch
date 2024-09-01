
import { BadRequestError } from "@/shared/application/erros/bad-requet-erros"
import { UserRepository } from "../../domain/repositorys/user.repository"
import { UserOutput, UserOutputMapper } from "../dtos/user-output"
import { UserCase as DefoultUseCase} from "@/shared/application/providers/usecase/use-case"

export namespace UpdateUserUserCase{
  export type Input = {
    id: string
    name: string
  }

  export type  Output = UserOutput

  export class UserCase implements DefoultUseCase<Input, Output> {
    //Injeção de userRepository

    constructor(private userRepository: UserRepository.Repository,
     ){

    }

    async execute(input: Input): Promise<Output> {
      if (!input.name) {
        throw new BadRequestError('name not provided')
      }

        const entity = await this.userRepository.findByID(input.id)
        entity.update(input.name)
        await this.userRepository.update(entity)
       return UserOutputMapper.toOutput(entity)
    }

  }
}


