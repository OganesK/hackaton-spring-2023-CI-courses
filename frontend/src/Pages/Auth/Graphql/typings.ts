export interface UserCreateInput {
  firstname: string;
  lastname: string;
  login: string;
  email: string;
  password: string;
}

export interface LogInInput {
  login: string;
  password: string;
}
