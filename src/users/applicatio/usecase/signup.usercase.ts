export namespace SignupUserCase{
  export type Input = {
    name: string
    email: string
    password: string
  }
  export type Output = {
    name: string
    email: string
    password: string
    created: Date
  }

  export class SignupUserCase {
    async execute(input: Input): Promise<Output> {}
  }
}

