import {validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'


type StubProps = {
  prop1: string,
  prop2: number
}
class StubEntity extends Entity<StubProps>{

}
describe('UserEntity init test', () => {

  it('shoud set props and id', ()=>{
    const props = {prop1: 'value1', prop2: 15}
    const entity = new StubEntity(props)
    // Verificar se props estão configurados corretamente
    expect(entity.props).toStrictEqual(props)
    // Verificar se ID não é nulo
    expect(entity._id).not.toBeNull()
    // Validar ID como UUID
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('shoud accept a valid uuid', ()=>{
    const props = {prop1: 'value1', prop2: 15}
    const id = '9b67058e-9389-4061-a90c-1f3b2704c90b'
    const entity = new StubEntity(props, id)
    // Validar ID como UUID
    expect(uuidValidate(entity._id)).toBeTruthy()
    // Verificar se ID corresponde ao UUID fornecido
    expect(entity._id).toBe(id)
  })

  it('shoud accept a valid to a javascript Object', ()=>{
    const props = {prop1: 'value1', prop2: 15}
    const id = '9b67058e-9389-4061-a90c-1f3b2704c90b'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })

});
