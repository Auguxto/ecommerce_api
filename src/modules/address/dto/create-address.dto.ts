import { IsString } from "class-validator";

export class CreateAddressDto {
  constructor(partial: Partial<CreateAddressDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  name: string;

  @IsString()
  cep: string;

  @IsString()
  road: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
