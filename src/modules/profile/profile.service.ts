import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileDto } from './profile.dto';
import { ProfileMapper } from './profile.mapper';
import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async create(body: ProfileDto): Promise<ProfileEntity> {
    const entity = ProfileMapper.toEntity(body);
    return await this.repository.create(entity);
  }

  async update(id: string, body: ProfileDto): Promise<ProfileEntity> {
    const entity = this.find(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    body.id = id;
    const entityToUpdate = ProfileMapper.toEntity(body);
    return await this.repository.update(entityToUpdate);
  }

  async remove(id: string): Promise<boolean> {
    const entity = this.find(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    await this.repository.delete(id);
    return true;
  }

  find(id: string): Promise<ProfileEntity | null> {
    return this.repository.find(id);
  }

  findAll(): Promise<ProfileEntity[]> {
    return this.repository.findAll();
  }
}
