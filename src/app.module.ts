import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileEntity } from './modules/profile/profile.entity';
import { ProfileRepository } from './modules/profile/profile.repository';
import { ProfileService } from './modules/profile/profile.service';
import { UserController } from './modules/user/user.controller';
import { UserEntity } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/local.sqlite',
      entities: [UserEntity, ProfileEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, ProfileEntity]), // Registra o repositório da entidade [[1]]
  ],
  controllers: [AppController, UserController, ProfileController],
  providers: [ProfileRepository, AppService, UserService, ProfileService], // Remova "UserEntity" dos providers
})
export class AppModule {}
