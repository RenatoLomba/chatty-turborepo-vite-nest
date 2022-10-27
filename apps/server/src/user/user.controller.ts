import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'

import { CreateUserDto } from './dtos'
import { UserService } from './user.service'

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    const user = await this.userService.findById(Number(id))

    if (!user) {
      throw new BadRequestException('User does not exists')
    }

    return user
  }

  @Post('/')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }
}
