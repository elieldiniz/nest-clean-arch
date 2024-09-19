import { FildsErros } from "../validators/validator-interface";

export class ValidationError extends Error {}

export class EntityValidationError extends Error{
  constructor(public error: FildsErros){
    super('Entity Valiadation Error')
    this.name = 'EntityValidationError'
  }
}
