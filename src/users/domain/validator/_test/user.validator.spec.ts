import { count } from "console"
import { UserProps } from "../../entities/user.entity"
import { UserDataBuilder } from "../../testing/helpers/user-data-builder"
import { UserRules, UserValidator, UserValidatorFactory } from "../user.validator"

let sut: UserValidator

let props: UserProps

describe('UserValidator unit test', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  it('valid case for user validator class',()=>{
    const props = UserDataBuilder({})
    const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })
  describe('name field', () => {
    it('invalidation cases name fild', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.erros['name']).toStrictEqual(
        [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      )

      isValid = sut.validate({...UserDataBuilder({}), name: '' as any})
      expect(isValid).toBeFalsy
      expect(sut.erros['name']).toStrictEqual(['name should not be empty'])

      isValid = sut.validate({...UserDataBuilder({}), name: 10 as any})
      expect(isValid).toBeFalsy
      expect(sut.erros['name']).toStrictEqual([
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ])

      isValid = sut.validate({...UserDataBuilder({}),
      name: 'a'.repeat(256)})
      expect(isValid).toBeFalsy
      expect(sut.erros['name']).toStrictEqual([
        "name must be shorter than or equal to 255 characters",
      ])
    })
  })
  describe('email fild', () => {
    it('invalidation cases for email fild', () => {

      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.erros['email']).toStrictEqual(
        [
          'email should not be empty',
          'email must be an email',
          'email must be a string',
          'email must be shorter than or equal to 255 characters'
        ]
      )

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: '' as any})

      expect(isValid).toBeFalsy
      expect(sut.erros['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ])

      isValid = sut.validate({...UserDataBuilder({}), email: 10 as any})
      expect(isValid).toBeFalsy
      expect(sut.erros['email']).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters'
      ])

      isValid = sut.validate({...UserDataBuilder({}),
      email: 'a'.repeat(256)})
      expect(isValid).toBeFalsy
      expect(sut.erros['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })

  })

  describe('password field', () => {
    it('Invalidation cases for password field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.erros['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({ ...props, password: '' })
      expect(isValid).toBeFalsy()
      expect(sut.erros['password']).toStrictEqual([
        'password should not be empty',
      ])

      isValid = sut.validate({ ...props, password: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.erros['password']).toStrictEqual([
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])

      isValid = sut.validate({ ...props, password: 'a'.repeat(256) })
      expect(isValid).toBeFalsy()
      expect(sut.erros['password']).toStrictEqual([
        'password must be shorter than or equal to 100 characters',
      ])
    })
  })


  describe('createdAt field', () => {
    it('invalidation cases createdAt fild', () => {
      let isValid = sut.validate({...props, createdAt: 10 as any})
      expect(isValid).toBeFalsy()
      expect(sut.erros['createdAt']).toStrictEqual(
        [ 'createdAt must be a Date instance' ]
      )

      isValid = sut.validate({...UserDataBuilder({}), createdAt: '2023' as any})
      expect(isValid).toBeFalsy
      expect(sut.erros['createdAt']).toStrictEqual(
        [ 'createdAt must be a Date instance' ]
      )})
  })
})
