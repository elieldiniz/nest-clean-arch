import { validateSync } from "class-validator";
import { FildsErros, validateFieldsInterface } from "./validator-interface";


export abstract class ClassValidatorFilds<ProspsValidated> implements validateFieldsInterface<ProspsValidated>{
  erros: FildsErros = null
  validatedData: ProspsValidated = null


  validate(data: any): boolean {
    const erros = validateSync(data)
    if(erros.length){
      this.erros = {}
      for (const error of erros){
        const field = error.property
        this.erros[field] = Object.values(error.constraints)
      }
    } else {
      this.validatedData = data
    }
    return !erros.length
  }

}


