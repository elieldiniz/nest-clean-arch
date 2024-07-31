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
    return
  }

  get perPage(){
    return
  }

  get sort() {
    return this._sort
  }

  private set sort(value: string | null){

  }

  get sortDir(){
    return this._sortDir
  }

  private set sortDir(value: string | null){

  }

  get filter(){
    return this._filter
  }

}

export interface SerchablsRepositoryInterface<
E extends Entity,
SerchInput,
SerchOutput
> extends RepositoryInterface <E>{
  seaech(props: SearchParams): Promise<SerchOutput>

}

