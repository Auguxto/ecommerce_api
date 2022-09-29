import { IsString } from "class-validator";

export class CreateBrandDto {
  constructor(partial: Partial<CreateBrandDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  name: string;
}
