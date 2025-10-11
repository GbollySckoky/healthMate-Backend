import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";


export class LoginDto {
  @ApiProperty({ example: 'danoyekunle6@gmail.com', description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  @MinLength(6)
  password: string;
}
