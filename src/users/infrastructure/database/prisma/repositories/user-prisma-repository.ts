import { NotFoudError } from "@/shared/domain/erros/not-foud-erros";
import { PrismaService } from "@/shared/infrastructure/database/prisma/prisma.service";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositorys/user.repository";
import { UsersModulemMapper } from "../models/user-model.mapper";

export class UserPrismaRepository implements UserRepository.Repository{

  sortableFields: string[];

  constructor(private prismaService: PrismaService){

  }

  findByEmail(email: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  emailExists(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  search(props: UserRepository.SearchParams): Promise<UserRepository.SerchResult> {
    throw new Error("Method not implemented.");
  }

  insert(entity: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findByID(id: string): Promise<UserEntity> {
    return this._get(id)
  }

  findAll(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }
  update(entity: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  protected async _get(id: string): Promise<UserEntity>{
    try {
        const user = await this.prismaService.user.findUnique({
          where: { id }
        })

        return UsersModulemMapper.toEntity(user);
    } catch (error) {
        throw new NotFoudError(`UserModel not found using ID ${id}`)
    }
  }
}

