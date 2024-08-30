
import { UserRepository } from "../../domain/repositorys/user.repository"
import { UserOutput, UserOutputMapper } from '../dtos/user-output'
import { UserCase as DefoultUseCase} from "@/shared/application/providers/usecase/use-case"
import { SaechInput } from "@/shared/application/dtos/searsh-input"
import { paginationOutput, PaginationOutputMapper } from "@/shared/application/dtos/pagination-output"


export namespace ListUserseCase{
  export type Input = SaechInput

  export type  Output = paginationOutput<UserOutput>

  export class UserCase implements DefoultUseCase<Input, Output> {
    //Injeção de userRepository

    constructor(private userRepository: UserRepository.Repository){}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input)
      const searchResult  = await this.userRepository.search(params)
      return this.toOutput(searchResult)
    }

    private toOutput(searchResult: UserRepository.SerchResult): Output {
      const items = searchResult.items.map(item => {
        return UserOutputMapper.toOutput(item)
      })
      return PaginationOutputMapper.toOutput(items, searchResult)
    }

  }
}


