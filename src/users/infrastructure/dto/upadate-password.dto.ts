import { UpadatePasswoerdUserCase } from "@/users/applicatio/usecases/upadate-password.usercase";

export class UpadeteUserDto implements Omit<UpadatePasswoerdUserCase.Input, 'id'>  {
  password: string;
  oldPassword: string;
}
