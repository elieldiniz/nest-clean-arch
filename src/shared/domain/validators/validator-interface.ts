export type FildsErros = {
  [fild: string]: string[]
}

export interface validateFieldsInterface<ProspsValidated> {
  erros: FildsErros
  validatedData: ProspsValidated
  validate(data: any): boolean
}

