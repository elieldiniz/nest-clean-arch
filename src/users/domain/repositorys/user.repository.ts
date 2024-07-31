
import { RepositoryInterface } from "@/shared/domain/repositories/repository-contracts"
import { UserEntity } from "../entities/user.entity"
import {SerchablsRepositoryInterface} from "@/shared/domain/repositories/searchble-repository-contracts"



export interface UserRepository extends SerchablsRepositoryInterface<UserEntity, any , any>{
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email:string): Promise<void>
}


