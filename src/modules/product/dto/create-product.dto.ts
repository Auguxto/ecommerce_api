import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  warranty: number;

  @IsString()
  description: string;
}
