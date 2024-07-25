import { ClassValidatorFilds } from "@/shared/domain/validators/class-validator-filder";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, max, MaxLength } from "class-validator";
import { UserProps } from "../entities/user.entity";

export class UserRules{

  // Validators
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsOptional()
  createdAt: Date

  constructor({email, name, password, createdAt}: UserProps){
    Object.assign(this,{email, name, password, createdAt })
  }
}

export class UserValidator extends ClassValidatorFilds<UserRules>{
  validate(data: UserProps): boolean {
      return super.validate(new UserRules(data ?? ({} as UserProps)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator{
    return new UserValidator()
  }
}

