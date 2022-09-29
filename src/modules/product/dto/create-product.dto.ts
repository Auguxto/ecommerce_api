import { IsString, IsNumber } from "class-validator";

export class CreateProductDto {
  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  name: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsNumber()
  warranty: number;

  @IsString()
  description: string;
}
