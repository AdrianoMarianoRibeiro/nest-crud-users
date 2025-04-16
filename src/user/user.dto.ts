import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: '69c51b00-40bc-4195-a7b2-7052de8ec260',
    description: 'ID do usuário',
    required: false,
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nome completo do usuário',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'john@email.com',
    description: 'E-mail do usuário',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
}
