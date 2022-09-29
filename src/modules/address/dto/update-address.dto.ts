import { IsString, IsOptional } from "class-validator";

export class UpdateAddressDto {
  constructor(partial: Partial<UpdateAddressDto>) {
    Object.assign(this, partial);
  }

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cep: string;

  @IsOptional()
  @IsString()
  road: string;

  @IsOptional()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;
}
