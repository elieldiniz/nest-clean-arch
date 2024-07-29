import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/shared/domain/erros/validation-erros"
import { repeat } from "rxjs"

describe('UserEntity integration test', () =>{

  describe('Constructor method ', ()=>{

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

     it('shoud throw an error when creating a user invalid password', ()=>{
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      password: '',
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      password: 'a'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
      password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
     })

     it('shoud throw an error when creating a user invalid CreatedAt', ()=>{
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
      createdAt: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
     })

     it('shoud a valid user', ()=>{
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({})

      }

      new UserEntity(props)


    })
  })

  describe('update mathod update name', () =>{

    it('shoud a invalid user using name fiels ', ()=>{
      const entity  = new UserEntity(UserDataBuilder({}))

      expect(() => entity.update(null)).toThrow(EntityValidationError)
      expect(() => entity.update('')).toThrow(EntityValidationError)
      expect(() => entity.update(10 as any)).toThrow(EntityValidationError)
      expect(() => entity.update('a'.repeat(256))).toThrow(EntityValidationError)

     })

     it('shoud a valid user', ()=>{
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({})

      }

      const entity = new UserEntity(props)

      entity.update('other name')


    })
  })

  describe('update mathod update Password', () =>{

    it('should invalid user using password fields ', ()=>{
      const entity  = new UserEntity(UserDataBuilder({}))

      expect(() => entity.updatPassword(null)).toThrow(EntityValidationError)
      expect(() => entity.updatPassword('')).toThrow(EntityValidationError)
      expect(() => entity.updatPassword(10 as any)).toThrow(EntityValidationError)
      expect(() => entity.updatPassword('a'.repeat(101))).toThrow(EntityValidationError)

     })

     it('shoud a valid user', ()=>{
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({})

      }

      const entity = new UserEntity(props)

      entity.updatPassword('other passwordww')


    })
  })
})
