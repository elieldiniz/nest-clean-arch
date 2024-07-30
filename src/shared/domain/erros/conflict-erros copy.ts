
export class ConflictErro extends Error{
  constructor(public message: string){
    super(message)
    this.name = 'notFoudError'
  }
}
