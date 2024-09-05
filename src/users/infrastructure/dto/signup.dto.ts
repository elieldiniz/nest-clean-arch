import { SignupUserCase } from "@/users/applicatio/usecases/signup.usercase";

export class SignupDto implements SignupUserCase.Input{
  name: string;
  email: string;
  password: string;
}
