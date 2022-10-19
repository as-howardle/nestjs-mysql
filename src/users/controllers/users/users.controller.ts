import { UsersService } from './../../service/users/users.service';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Post()
  async createUser(@Req() request: Request, @Res() response: Response) {
    const data = request.body;
    const data2 = await this.usersService.createUser(
      data.username,
      data.password,
    );
    response.json(data2);
  }

  @Put(':id')
  updateUserByid(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.usersService.updateUser(
      id,
      req.body.username,
      req.body.password,
    );
  }
}
