import {  SigninUserCase} from "@/users/applicatio/usecases/signin.usercase";

export class SigninDto implements SigninUserCase.Input{
  email: string;
  password: string;
}
