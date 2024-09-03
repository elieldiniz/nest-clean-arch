
import { UserRepository } from "../../domain/repositorys/user.repository"
import { UserOutput } from "../dtos/user-output"
import { UserCase as DefoultUseCase} from "@/shared/application/providers/usecase/use-case"

export namespace DeleteUserUserCase{
  export type Input = {
    id: string
  }

  export type  Output = void

  export class UserCase implements DefoultUseCase<Input, Output> {
    //Injeção de userRepository

    constructor(private userRepository: UserRepository.Repository,
     ){

    }

    async execute(input: Input): Promise<Output> {
        await this.userRepository.delete(input.id)
    }
  }
}


