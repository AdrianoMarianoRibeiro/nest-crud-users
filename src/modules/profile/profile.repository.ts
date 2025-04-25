import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    protected readonly repository: Repository<ProfileEntity>,
  ) {}

  create(profileEntity: ProfileEntity): Promise<ProfileEntity> {
    return this.repository.save(profileEntity);
  }

  update(profileEntity: ProfileEntity): Promise<ProfileEntity> {
    return this.create(profileEntity);
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  find(id: string): Promise<ProfileEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  findAll(): Promise<ProfileEntity[]> {
    return this.repository.find();
  }
}
