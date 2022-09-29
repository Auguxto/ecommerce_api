import { Product } from "@prisma/client";

import prisma from "../../lib/prisma";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import AppError from "../../error/AppError";

export default class ProductService {
  async create(
    createProductDto: CreateProductDto,
    admin: string
  ): Promise<Product> {
    const user = await prisma.user.findUnique({
      where: {
        id: admin
      }
    });

    if (!user || !user.admin) throw new AppError("Unauthorized", 401);

    const quantity = createProductDto.quantity;
    const brand_id = createProductDto.brand_id;

    delete createProductDto.quantity;
    delete createProductDto.brand_id;

    if (brand_id) {
      const brand = await prisma.productBrand.findUnique({
        where: {
          id: brand_id
        }
      });

      if (!brand) throw new AppError("Brand not found", 404);
    }

    let product = await prisma.product.create({
      data: {
        ...createProductDto,
        brand_id,
        inventory: {
          create: {
            quantity: quantity
          }
        }
      },
      include: {
        inventory: true,
        brand: true
      }
    });

    return product;
  }

  async read(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        inventory: true,
        brand: true
      }
    });

    if (!product) throw new AppError("Product nout found", 404);

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    admin: string
  ): Promise<Product> {
    const user = await prisma.user.findUnique({
      where: {
        id: admin
      }
    });

    if (!user || !user.admin) throw new AppError("Unauthorized", 401);

    let product = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        inventory: true
      }
    });

    if (!product) throw new AppError("Product nout found", 404);

    const quantity = updateProductDto.quantity;
    const brand_id = updateProductDto.brand_id;

    delete updateProductDto.quantity;
    delete updateProductDto.brand_id;

    if (brand_id) {
      const brand = await prisma.productBrand.findUnique({
        where: {
          id: brand_id
        }
      });

      if (!brand) throw new AppError("Brand not found", 404);
    }

    product = await prisma.product.update({
      where: {
        id
      },
      include: {
        inventory: true,
        brand: true
      },
      data: {
        ...updateProductDto,
        brand_id,
        inventory: {
          update: {
            quantity: quantity || product.inventory?.quantity
          }
        }
      }
    });

    return product;
  }

  async delete(id: string, admin: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id: admin
      }
    });

    if (!user || !user.admin) throw new AppError("Unauthorized", 401);

    const product = await prisma.product.findUnique({
      where: {
        id
      }
    });

    if (!product) throw new AppError("Product nout found", 404);

    await prisma.product.deleteMany({
      where: {
        id
      }
    });

    return;
  }
}
