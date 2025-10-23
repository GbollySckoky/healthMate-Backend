import { UserRole } from "@/users/enums/user-role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';


export class SignupDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'danoyekunle6@gmail.com', description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+2349061504585', description: 'Phone number of the user' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  @MinLength(8) // TODO: Uppercase, Numbers?
  password: string;

  @ApiProperty({ example: UserRole.PATIENT, description: 'Role of the user', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
