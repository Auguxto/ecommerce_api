import { Request, Response } from "express";
import { validate } from "class-validator";

import BrandService from "./brand.service";

import { CreateBrandDto } from "./dto/create-brand.dto";

import AppError from "../../error/AppError";

export default class BrandController {
  async create(request: Request, response: Response) {
    const createBrandDto = new CreateBrandDto(request.body);

    const errors = await validate(createBrandDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new BrandService();
    const brand = await service.create(createBrandDto, request.user);

    return response.status(201).json(brand).end();
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;

    const service = new BrandService();
    const brand = await service.read(id, request.user);

    return response.status(200).json(brand).end();
  }
}
