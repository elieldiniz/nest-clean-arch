
import { faker } from '@faker-js/faker'
import {UserEntity, UserProps} from '../../user.entity'
describe('UserEntity init test', () => {

  let props: UserProps

  let sut: UserEntity

  beforeEach(()=>{
    props = {
      name: "Joao wsl solza",
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

  it('Getter od name fiel', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(sut.props.name)
    expect(typeof sut.props.name).toBe('string')
  });

  it('Setter od name fiel', () => {
    sut['name'] = 'other name'
    expect(sut.props.name).toEqual('other name')
    expect(typeof sut.props.name).toBe('string')
  });




  it('Getter od email fiel', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(sut.props.email)
    expect(typeof sut.props.email).toBe('string')
  });

  it('Getter od password fiel', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(sut.props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Setter od password fiel', () => {
    sut['password'] = 'other password'
    expect(sut.props.password).toEqual('other password')
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter od createdAt fiel', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('shoud update a user ', () => {
    sut.update('other user')
    expect(sut.props.name).toEqual('other user')

  })

  it('shoud update a password fild ', () => {
    sut.update('other password')
    expect(sut.props.name).toEqual('other password')
  })


});
