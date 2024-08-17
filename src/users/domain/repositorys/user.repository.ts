

import { UserEntity } from "../entities/user.entity"
import { SerchResult as DefautSerchResult , SearchParams  as DefautSearchParams, SerchablsRepositoryInterface } from "@/shared/domain/repositories/searchble-repository-contracts"


export namespace UserRepository {
  export type Filter = string

  export class SearchParams extends DefautSearchParams {}

  export class SerchResult extends DefautSerchResult<UserEntity, Filter>{}

  export interface Repository extends SerchablsRepositoryInterface<UserEntity, Filter , SearchParams,SerchResult>{
    findByEmail(email: string): Promise<UserEntity>
    emailExists(email:string): Promise<void>
  }
}

