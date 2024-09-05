import { SortDirection } from "@/shared/domain/repositories/searchble-repository-contracts";
import { ListUserseCase } from "@/users/applicatio/usecases/listUser.usercase";

export class SignupDto implements ListUserseCase.Input{
  page?: number
  perPage?: number
  sort?: string
  sortDir?: SortDirection
  filter?: string
}
