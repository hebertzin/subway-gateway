import { PaginationResult } from "../../../application/usecases/users/get-users-use-case";
import { User } from "../../entities/users";

export interface GetUsers {
  execute(
    filters: Partial<User>,
    page: number,
    pageSize: number
  ): Promise<PaginationResult>;
}
