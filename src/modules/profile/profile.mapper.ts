import { randomUUID } from 'crypto';
import { ProfileDto } from './profile.dto';
import { ProfileEntity } from './profile.entity';

export abstract class ProfileMapper {
  static toEntity(body: ProfileDto): ProfileEntity {
    return {
      id: body.id ?? randomUUID(),
      name: body.name,
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
