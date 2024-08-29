export interface UserCase<Input,Output>{
  execute(input: Input): Output | Promise<Output>
}

