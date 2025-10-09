import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from "../enums/user-role.enum";


export class UserResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identifier of the user',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+2349061504585', description: 'Phone number of the user' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: UserRole.USER, description: 'Role of the user', enum: UserRole })
  role: UserRole;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
  @IsString()
  @IsOptional()
  accessToken?: string;
}

