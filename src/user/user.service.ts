import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(userDto: UserDto): Promise<any> {
    const userEntity = UserMapper.toEntity(userDto);

    const user = await this.repository.save(userEntity);

    return UserMapper.toResponse(
      userDto.id ? HttpStatus.OK : HttpStatus.CREATED,
      'Success',
      user,
    );
  }

  async update(id: string, userDto: UserDto): Promise<any> {
    const userEntity = await this.repository.findOneBy({ id });

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    return await this.create({ id, ...userDto });
  }

  async findAll(): Promise<any> {
    const userEntities = await this.repository.find();

    return UserMapper.toResponse(HttpStatus.OK, 'Success', userEntities);
  }

  async findOne(id: string): Promise<any> {
    const userEntity = await this.repository.findOneBy({ id });

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toResponse(HttpStatus.OK, 'Success', userEntity);
  }

  async remove(id: string): Promise<any> {
    await this.repository.delete(id);

    return UserMapper.toResponse(HttpStatus.OK, 'Success', true);
  }
}
