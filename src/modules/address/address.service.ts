import { Address } from "@prisma/client";

import prisma from "../../lib/prisma";

import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

import AppError from "../../error/AppError";

export default class AddressService {
  async create(
    createAddressDto: CreateAddressDto,
    user: string
  ): Promise<Address> {
    const address = await prisma.address.create({
      data: {
        ...createAddressDto,
        user_id: user
      }
    });

    return address;
  }

  async read(id: string, user: string): Promise<Address> {
    const address = await prisma.address.findUnique({
      where: {
        id
      }
    });

    if (!address) throw new AppError("Address nout found", 404);

    if (address.user_id !== user) throw new AppError("Unauthorized", 401);

    return address;
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
    user: string
  ): Promise<Address> {
    let address = await prisma.address.findUnique({
      where: {
        id
      }
    });

    if (!address) throw new AppError("Address nout found", 404);

    if (address.user_id !== user) throw new AppError("Unauthorized", 401);

    address = await prisma.address.update({
      where: {
        id
      },
      data: {
        ...updateAddressDto
      }
    });

    return address;
  }

  async delete(id: string, user: string): Promise<void> {
    const address = await prisma.address.findUnique({
      where: {
        id
      }
    });

    if (!address) throw new AppError("Address nout found", 404);

    if (address.user_id !== user) throw new AppError("Unauthorized", 401);

    await prisma.address.deleteMany({
      where: {
        id
      }
    });

    return;
  }
}
