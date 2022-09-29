import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateProductDto {
  constructor(partial: Partial<UpdateProductDto>) {
    Object.assign(this, partial);
  }

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  warranty: number;

  @IsOptional()
  @IsString()
  description: string;
}
