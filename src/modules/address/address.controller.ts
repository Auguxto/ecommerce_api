import { Request, Response } from "express";
import { validate } from "class-validator";

import AddressService from "./address.service";

import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

import AppError from "../../error/AppError";

export default class AddressController {
  async create(request: Request, response: Response) {
    const createAddressDto = new CreateAddressDto(request.body);

    const errors = await validate(createAddressDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new AddressService();
    const address = await service.create(createAddressDto, request.user);

    return response.status(201).json(address).end();
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;

    const service = new AddressService();
    const address = await service.read(id, request.user);

    return response.status(200).json(address).end();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const updateAddressDto = new UpdateAddressDto(request.body);

    const errors = await validate(updateAddressDto);
    if (errors.length > 0) {
      throw new AppError("Invalid params", 404);
    }

    const service = new AddressService();
    const address = await service.update(id, updateAddressDto, request.user);

    return response.status(200).json(address).end();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const service = new AddressService();
    await service.delete(id, request.user);

    return response.status(200).end();
  }
}
