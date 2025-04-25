import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    example: '69c51b00-40bc-4195-a7b2-7052de8ec260',
    description: 'ID do perfil',
    required: false,
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Nome do perfil',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
