import { IsString, IsOptional, IsBoolean, IsDateString } from "class-validator";

export class CreateUserDto {
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }

  @IsOptional()
  @IsString()
  rg: string;

  @IsString()
  cpf: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  telephone: string;

  @IsOptional()
  @IsBoolean()
  newsletter: boolean;

  @IsDateString()
  birthday: Date;
}
