import { UserEntity } from "@/users/domain/entities/user.entity";
import { User } from "@prisma/client";
import { ValidationError } from "@/shared/domain/erros/validation-erros"


export class UsersModulemMapper {
  static toEntity(model: User){
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.created_at,
    }

    try{
      return new UserEntity(data, model.id);
    }catch{
      throw new ValidationError('An entity not loaded')
    }
  }
}
