export interface DeleteUser {
  execute(user_id: string): Promise<void>;
}
