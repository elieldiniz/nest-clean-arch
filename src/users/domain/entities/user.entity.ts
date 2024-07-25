import { Entity } from "@/shared/domain/entities/entity"
import { UserValidatorFactory } from "../validator/user.validator"
import { EntityValidationError } from "@/shared/domain/erros/validation-erros"

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt ?: Date
}


export class UserEntity extends Entity<UserProps>{
  constructor(public readonly props: UserProps, id?: string){
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt =  this.props.createdAt ?? new Date()
  }

  update(value: string): void {
    UserEntity.validate( {...this.props, name: value})
    this.name = value
  }

  updatPassword(value: string): void {
    UserEntity.validate( {...this.props, password: value})
    this.password = value
  }

  get name(){
    return this.props.name
  }

  private set name(value: string){
    this.props.name = value
  }

  get email(){
    return this.props.email
  }

  get password(){
    return this.props.password
  }

  private set password(value: string){
    this.props.password = value
  }

  get createdat(){
    return this.props.createdAt
  }

  static validate(props: UserProps){
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)
    if(!isValid){
      throw new EntityValidationError(validator.erros)
    }
  }

}
