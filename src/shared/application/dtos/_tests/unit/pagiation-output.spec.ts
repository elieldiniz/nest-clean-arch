import { SerchResult } from "@/shared/domain/repositories/searchble-repository-contracts";
import { PaginationOutputMapper } from "../../pagination-output";

describe('PaginationOutputMapper unit tests', () => {
  it('should convert a SearchResult in output', () => {
    const result = new SerchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: '',
      sortDir: '',
      filter: 'fake',
    })

    const sut = PaginationOutputMapper.toOutput(result.items, result)

    const resuts = {
      items: ['fake'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    }
    expect(sut).toStrictEqual(resuts)
  })
})
