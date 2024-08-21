import { BadRequestError } from "../erros/bad-requet-erros"
import { UserRepository } from "../../domain/repositorys/user.repository"
import { UserEntity } from "@/users/domain/entities/user.entity"

export namespace SignupUserCase{
  export type Input = {
    name: string
    email: string
    password: string
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

    constructor(private userRepository: UserRepository.Repository ){

    }
    async execute(input: Input): Promise<Output> {
      const {email,name, password} = input

      if(!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
    }

    await this.userRepository.emailExists(email)

    const entity = new UserEntity(input)

    await this.userRepository.insert(entity)

    return entity.toJSON()
  }
}
}

