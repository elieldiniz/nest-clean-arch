import { Entity } from "@/shared/domain/entities/entity"
import { InMemoryRepository } from "../../in-memory.repository"
import { InMemorySearchebleRepository } from "../../in-memory-searcheble.repository"

type StubeEntityProps = {
  name: string
  price: number
}
class StubeEntity extends Entity<StubeEntityProps>{}


class StrubInmemorySearchebleRepository extends InMemorySearchebleRepository<StubeEntity> {
  sortableFields: string[] = ['name']

  protected async applyFilter(items: StubeEntity[], filter: string | null): Promise<StubeEntity[]> {
    if (!items || !filter) {
      return items
    }
    return items.filter(item => {
      const itemName = item.props.name;
      return itemName ? itemName.toLowerCase().includes(filter.toLowerCase()) : false;
    })
  }
}

describe('InMemoryRepositry unit tests', ()=>{
  let sut: StrubInmemorySearchebleRepository

  beforeEach(()=>{
    sut = new StrubInmemorySearchebleRepository()
  })

  describe('apllyFilter method', ()=>{
    it("shoud no filter items when filter param is null",async ()=>{
      const items = [new StubeEntity({name: 'name value', price: 50})]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const itemsFiltered =  await sut['applyFilter'](items, null)

      expect(itemsFiltered).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it("shoud filter using a filted param",async ()=>{
      const items = [
      new StubeEntity({name: 'test value', price: 50}),
      new StubeEntity({name: 'TEST value', price: 30}),
      new StubeEntity({name: 'faker value', price: 60})
    ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      let itemsFiltered =  await sut['applyFilter'](items,  'test')

      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)


      itemsFiltered =  await sut['applyFilter'](items,  'test')
      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(2)

      itemsFiltered =  await sut['applyFilter'](items,  'no-filter')
      expect(itemsFiltered).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
    })

  })

  describe('apllySort method', ()=>{
    it("shoud no sort items",async ()=>{
      const items = [
      new StubeEntity({name: 'b', price: 50}),
      new StubeEntity({name: 'a', price: 30}),
    ]
      let itemsSortd =  await sut['applySort'](items,null,null)
      expect(itemsSortd).toStrictEqual(items)

      itemsSortd =  await sut['applySort'](items,'price','asc')
      expect(itemsSortd).toStrictEqual(items)
    })

    it("shoud sort items",async ()=>{
      const items = [
      new StubeEntity({name: 'b', price: 50}),
      new StubeEntity({name: 'a', price: 50}),
      new StubeEntity({name: 'c', price: 50})
    ]

    let itemsSortd =  await sut['applySort'](items,'name','asc')
    expect(itemsSortd).toStrictEqual([items[1], items[0], items[2]])

    itemsSortd =  await sut['applySort'](items,'name','desc')
    expect(itemsSortd).toStrictEqual([items[2], items[0], items[1]])


    })
  })


  describe('apllyPaginate method', ()=>{
    it("shoud paginate items",async ()=>{
      const items = [
      new StubeEntity({name: 'b', price: 50}),
      new StubeEntity({name: 'a', price: 50}),
      new StubeEntity({name: 'c', price: 50}),
      new StubeEntity({name: 'd', price: 50}),
      new StubeEntity({name: 'e', price: 50}),
    ]

    let itemsSortd =  await sut['applyPaginate'](items,1,2)
    expect(itemsSortd).toStrictEqual([items[0], items[1]])

    itemsSortd =  await sut['applyPaginate'](items,2,2)
    expect(itemsSortd).toStrictEqual([items[2], items[3]])

    itemsSortd =  await sut['applyPaginate'](items,3,2)
    expect(itemsSortd).toStrictEqual([items[4]])

    itemsSortd =  await sut['applyPaginate'](items,4,2)
    expect(itemsSortd).toStrictEqual([])
    })
  })

  describe('apllySearch method', ()=>{

  })
})
