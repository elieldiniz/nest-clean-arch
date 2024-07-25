import { UserProps } from "../../entities/user.entity"
import { UserDataBuilder } from "../../testing/helpers/user-data-builder"
import { UserValidator, UserValidatorFactory } from "../user.validator"

let sut: UserValidator

let props: UserProps

describe('UserValidator unit test', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
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
      




    })
  })


})
