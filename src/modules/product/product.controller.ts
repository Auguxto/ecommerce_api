import { Request, Response } from "express";
import { validate } from "class-validator";

import ProductService from "./product.service";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import AppError from "../../error/AppError";

export default class ProductController {
  async create(request: Request, response: Response) {
    const createProductDto = new CreateProductDto(request.body);

    const errors = await validate(createProductDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new ProductService();
    const product = await service.create(createProductDto, request.user);

    return response.status(201).json(product).end();
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;

    const service = new ProductService();
    const product = await service.read(id);

    return response.status(200).json(product).end();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const updateProductDto = new UpdateProductDto(request.body);

    const errors = await validate(updateProductDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new ProductService();
    const product = await service.update(id, updateProductDto, request.user);

    return response.status(200).json(product).end();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const service = new ProductService();
    await service.delete(id, request.user);

    return response.status(200).end();
  }
}
