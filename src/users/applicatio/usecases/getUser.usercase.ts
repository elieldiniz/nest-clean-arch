
import { UserRepository } from "../../domain/repositorys/user.repository"
import { UserOutput } from "../dtos/user-output"

export namespace GetUserCase{
  export type Input = {
    id: string
  }

  export type  Output = UserOutput

  export class UserCase {
    //Injeção de userRepository

    constructor(private userRepository: UserRepository.Repository,
     ){

    }

    async execute(input: Input): Promise<Output> {
        const entity = await this.userRepository.findByID(input.id)
        return entity.toJSON()
    }

  }
}


