import { Entity } from "@/shared/domain/entities/entity"
import { InMemoryRepository } from "../../in-memory.repository"
import { SuiteContext } from "node:test"
import { NotFoudError } from "@/shared/domain/erros/not-foud-erros"
import { rejects } from "node:assert"

type StubeEntityProps = {
  name: string
  price: number
}
class StubeEntity extends Entity<StubeEntityProps>{}


class StrubInmemoryRepository extends InMemoryRepository<StubeEntity>{}

describe('InMemoryRepositry unit tests', ()=>{
  let sut: StrubInmemoryRepository

  beforeEach(()=>{
    sut = new StrubInmemoryRepository()
  })

  it("shold inserts a new entity",async ()=>{
    const entity = new StubeEntity({name:'test name', price: 50 })
    await sut.insert(entity)

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it("should throw error when entity not", async () => {
    await expect(sut.findByID('fakerId')).rejects.toThrow(new NotFoudError('Entity not found'));
  })

  it("shold find a entity by id",async ()=>{
    const entity = new StubeEntity({name:'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findByID(entity._id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it("shold return all entities",async ()=>{
    const entity = new StubeEntity({name:'test name', price: 50 })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })

  it("should throw error on update when entity not foud", async () => {
    const entity = new StubeEntity({name:'test name', price: 50 })

    await expect(sut.update(entity)).rejects.toThrow(new NotFoudError('Entity not found'))

  })

  it("shold update a entity by id",async ()=>{
    const entity = new StubeEntity({name:'test name', price: 50 })
    await sut.insert(entity)
    const entityUpdated = new StubeEntity({name:'updated', price: 10 }, entity._id)
    await sut.update(entityUpdated)
    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it("should throw error when entity not", async () => {
    await expect(sut.delete('fakerId')).rejects.toThrow(new NotFoudError('Entity not found'));
  })

  it("shold delete an entity ",async ()=>{
    const entity = new StubeEntity({name:'test name', price: 50 })
    await sut.insert(entity)
    await sut.delete(entity._id)
    expect(sut.items).toHaveLength(0)
  })

})
