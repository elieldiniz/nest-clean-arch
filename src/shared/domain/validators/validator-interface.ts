export type FildsErros = {
  [fild: string]: string[]
}

export interface validateFieldsInterface<ProspsValidated> {
  erros: FildsErros
  validatedFata: ProspsValidated
  validate(data: any): boolean
}
