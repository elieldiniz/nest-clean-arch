import { Entity } from "@/shared/domain/entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export interface SerchablsRepositoryInterface<
E extends Entity,
SerchInput,
SerchOutput
> extends RepositoryInterface <E>{
  seaech(props: SerchInput): Promise<SerchOutput>

}

