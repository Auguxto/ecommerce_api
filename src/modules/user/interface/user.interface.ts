export interface IUser {
  id: string;
  rg: string;
  cpf: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  newsletter: boolean;
  birthday: Date;
  created_at: Date;
  updated_at: Date;
}
