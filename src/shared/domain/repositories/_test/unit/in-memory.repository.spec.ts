import { Entity } from "@/shared/domain/entities/entity"
import { InMemoryRepository } from "../../in-memory.repository"
import { SuiteContext } from "node:test"

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
})
