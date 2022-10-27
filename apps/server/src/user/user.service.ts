import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ id, userName, avatarUrl }: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: {
        id,
        userName,
        avatarUrl,
      },
    })
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
