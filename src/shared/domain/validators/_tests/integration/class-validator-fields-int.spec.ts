import { IsNotEmpty, IsNumber, IsString, max, MaxLength } from "class-validator";
import { ClassValidatorFilds } from "../../class-validator-filder";

class StubRules{

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: Number

  constructor(data: any){
    Object.assign( this, data)


  }
}


class stubClassValidatorFilds extends ClassValidatorFilds<StubRules>{
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}


describe('ClassValidatorField integration test', () =>{

  it('shoud validate with errors', ()=>{
    const validator =  new stubClassValidatorFilds()
    expect(validator.validate(null)).toBeFalsy()
    expect(validator.erros).toStrictEqual( {
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters'
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints'
      ]
    })

  })

  it('shoud validate without errors', ()=>{
    const validator =  new stubClassValidatorFilds()
    expect(validator.validate({name: 'value',price: 10})).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(new StubRules({name: 'value',price: 10}))

  })
})
