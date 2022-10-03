import prisma from "../../lib/prisma";
import * as crypt from "../../lib/crypt";

import AppError from "../../error/AppError";

import { CreateUserDto } from "./dto/create-user.dto";

export default class UserService {
  async create(createUserDto: CreateUserDto) {
    let user = await prisma.user.findFirst({
      where: {
        email: createUserDto.email
      }
    });

    if (user) throw new AppError("User already registered", 429);

    const password = crypt.encrypt(createUserDto.password);

    user = await prisma.user.create({
      data: {
        ...createUserDto,
        password,
        cart: {
          create: {}
        }
      }
    });

    return;
  }
}
