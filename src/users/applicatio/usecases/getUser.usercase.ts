
import { UserRepository } from "../../domain/repositorys/user.repository"

export namespace GetUserCase{
  export type Input = {
    id: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
  }

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


