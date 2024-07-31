import { Entity } from "@/shared/domain/entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export type SortDirection = 'asc' | 'desc'

export type SerchProps<Filter = string> = {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir: SortDirection | null
  filter?: Filter | null
}

export class SearchParams {
  protected _page: number
  protected _perPage = 15
  protected _sort: string | null
  protected _sortDir: SortDirection | null
  protected _filter: string | null

  constructor(props: SerchProps){
    this._page = props.page
    this._perPage = props.perPage
    this._sort = props.sort
    this._sortDir = props.sortDir
    this._filter = props.filter
  }

  get page(){
    return this.page
  }

  private set page(value: number){
    let _page = +value
    if(Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) === _page){
      _page = 1
    }
    this._page = _page
  }

  get perPage(){
    return this._perPage
  }

  private  set perPage(value: number){
    let _perPage = +value
    if(Number.isNaN(_perPage) || _perPage <= 0 || parseInt(_perPage as any) === _perPage){
      _perPage = 1
    }
   this._perPage = _perPage
  }

  get sort() {
    return this._sort
  }

  private set sort(value: string | null){
      this.sort = value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sortDir(){
    return this._sortDir
  }

  private set sortDir(value: string | null) {
    if (!this.sort) {
        this._sortDir = null;
        return;
    }
    const dir = `${value}`.toLowerCase();
    this._sortDir = (dir === 'asc' || dir === 'desc') ? dir : 'desc';
}


  get filter(){
    return this._filter
  }

  private set filter(value: string){
    this.filter = value === null || value === undefined || value === '' ? null : `${value}`
  }


}

export interface SerchablsRepositoryInterface<
E extends Entity,
SerchInput,
SerchOutput
> extends RepositoryInterface <E>{
  seaech(props: SearchParams): Promise<SerchOutput>

}

