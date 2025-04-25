import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';

@ApiTags('Perfil') // Tag para agrupar endpoints
@Controller({
  path: 'profile',
  version: '1',
})
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os perfis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de perfis retornada',
    example: {
      status: 200,
      message: 'Perfil list',
      data: [
        {
          id: '69c51b00-40bc-4195-a7b2-7052de8ec260',
          name: 'ADMIN',
        },
        {
          id: '112233-40bc-4195-a7b2-7052de8ec260',
          name: 'Perfil',
        },
      ],
    },
  })
  async findAll(): Promise<any> {
    return {
      code: HttpStatus.OK,
      message: 'Perfil list',
      data: await this.service.findAll(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo perfil' })
  @ApiBody({
    type: ProfileDto,
    description: 'Dados do perfil a serem criados',
    examples: {
      body: {
        value: {
          name: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'perfil criado com sucesso',
    example: {
      status: 201,
      message: 'Perfil created successfully',
      data: {
        id: '69c51b00-40bc-4195-a7b2-7052de8ec260',
        name: 'ADMIN',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() body: ProfileDto): Promise<any> {
    return this.service.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um perfil' })
  @ApiResponse({ status: 200, description: 'perfil alterado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(
    @Param('id') id: string,
    @Body() body: ProfileDto,
  ): Promise<ProfileEntity> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um perfil' })
  @ApiResponse({ status: 200, description: 'perfil deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  delete(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar perfil por ID' })
  @ApiResponse({ status: 200, description: 'perfil encontrado' })
  @ApiResponse({ status: 404, description: 'perfil não encontrado' })
  find(@Param('id') id: string): Promise<any> {
    return this.service.find(id);
  }
}
