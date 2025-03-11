import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  findAll(): Promise<any> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: UserDto): Promise<any> {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UserDto): Promise<UserEntity> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<any> {
    return this.service.findOne(id);
  }
}
