import { ClassValidatorFilds } from "@/shared/domain/validators/class-validator-filder";
import { IsDate, IsNotEmpty, IsOptional, IsString, max, MaxLength } from "class-validator";
import { UserProps } from "../entities/user.entity";

export class UserRules{

  // Validators
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createAt: Date

  constructor(emal, name, password, createAt){

    Object.assign(this, {emal, name, password, createAt} )


  }
}

export class UserValidator extends ClassValidatorFilds<UserRules>{
  validate(data: UserProps): boolean {
      return super.validate(new UserRules(data.email, data.name, data.password, data.createdAt ?? new Date()))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator{
    return new UserValidator()
  }
}

