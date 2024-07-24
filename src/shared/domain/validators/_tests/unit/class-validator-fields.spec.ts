import { ClassValidatorFilds } from "../../class-validator-filder";
import * as libClassValidator from "class-validator";

class stubClassValidatorFilds extends ClassValidatorFilds<{field: string}>{}


describe('ClassValidatorField unit tests', () =>{

  it('shoud initialize erros and validatedData variables with null', ()=>{
    const sut = new stubClassValidatorFilds()

    expect(sut.erros).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it('shoud validate with errors', ()=>{

    const spyValidateSync = jest.spyOn(libClassValidator,'validateSync')
    spyValidateSync.mockReturnValue([
      {property: 'field', constraints: { isRequired: 'test error'}}
    ]
    )
    const sut = new stubClassValidatorFilds()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.erros).toStrictEqual({ field: ['test error']})

  })

  it('shoud validate without errors', ()=>{

    const spyValidateSync = jest.spyOn(libClassValidator,'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new stubClassValidatorFilds()

    expect(sut.validate({field: 'value'})).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({field: 'value'})
    expect(sut.erros).toBeNull()

  })

})
