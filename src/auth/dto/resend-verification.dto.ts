import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ResendVerificationDto {
  @ApiProperty({ description: 'Email address of the user', example: 'danoyekunle6@gmail.com' })
  @IsEmail()
  email: string;
}

