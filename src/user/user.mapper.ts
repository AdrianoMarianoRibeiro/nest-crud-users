import { randomUUID } from 'node:crypto';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

export abstract class UserMapper {
  static toEntity(body: UserDto): UserEntity {
    return {
      id: body.id ?? randomUUID(),
      name: body.name,
      email: body.email,
    };
  }

  static toResponse(status: number, message: string, data: any) {
    return {
      status,
      message,
      data,
    };
  }
}
