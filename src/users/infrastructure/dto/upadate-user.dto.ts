import { UpdateUserUserCase } from "@/users/applicatio/usecases/updateuser.usercase";

export class UpadeteUserDtp implements Omit<UpdateUserUserCase.Input, 'id'>  {
  name: string
}
