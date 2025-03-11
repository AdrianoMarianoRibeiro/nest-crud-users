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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') // Tag para agrupar endpoints
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada' })
  findAll(): Promise<any> {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({
    type: UserDto,
    description: 'Dados do usuário a serem criados',
    examples: {
      body: {
        value: {
          name: 'John Doe',
          email: 'john@email.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    example: {
      status: 201,
      message: 'User created successfully',
      data: {
        id: '69c51b00-40bc-4195-a7b2-7052de8ec260',
        name: 'John Doe',
        email: 'john@email.com',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() body: UserDto): Promise<any> {
    return this.service.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Param('id') id: string, @Body() body: UserDto): Promise<UserEntity> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  delete(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  @Get(':id')
  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  find(@Param('id') id: string): Promise<any> {
    return this.service.findOne(id);
  }
}
