
import { faker } from '@faker-js/faker'
import {UserEntity, UserProps} from '../../user.entity'
describe('UserEntity init test', () => {

  let props: UserProps

  let sut: UserEntity

  beforeEach(()=>{
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

  })

  it('Constructor method', () => {
   sut = new UserEntity(props)
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)

  });

  it('should initialize the user entity with custom values', () => {
    // ... teste para inicialização com valores personalizados ...
  });

});
