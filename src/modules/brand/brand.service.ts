import { ProductBrand } from "@prisma/client";

import prisma from "../../lib/prisma";

import { CreateBrandDto } from "./dto/create-brand.dto";

import AppError from "../../error/AppError";

export default class BrandService {
  async create(
    createBrandDto: CreateBrandDto,
    admin: string
  ): Promise<ProductBrand> {
    const user = await prisma.user.findUnique({
      where: {
        id: admin
      }
    });

    if (!user || !user.admin) throw new AppError("Unauthorized", 401);

    let brand = await prisma.productBrand.findUnique({
      where: {
        name: createBrandDto.name
      }
    });

    if (brand) throw new AppError("Brand name already registered", 429);

    brand = await prisma.productBrand.create({
      data: {
        ...createBrandDto
      },
      include: {
        products: true
      }
    });

    return brand;
  }

  async read(id: string, admin: string): Promise<ProductBrand> {
    const user = await prisma.user.findUnique({
      where: {
        id: admin
      }
    });

    if (!user || !user.admin) throw new AppError("Unauthorized", 401);

    const brand = await prisma.productBrand.findUnique({
      where: {
        id
      },
      include: {
        products: true
      }
    });

    if (!brand) throw new AppError("Brand not found", 404);

    return brand;
  }
}
