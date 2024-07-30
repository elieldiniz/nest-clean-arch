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

})
