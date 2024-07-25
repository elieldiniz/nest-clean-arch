import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/shared/domain/erros/validation-erros"

describe('UserEntity integration test', () =>{

  describe('Constructor method', ()=>{

     it('shoud throw an error when creating a user invalid name', ()=>{
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      name: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
     })

     it('shoud throw an error when creating a user invalid email', ()=>{
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      name: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      email: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
     })


  })
})
