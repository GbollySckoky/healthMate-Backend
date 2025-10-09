import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class VerifyEmailDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email address to verify' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '000000', description: '6-digit OTP code sent to the email' })
  @IsString()
  @Length(6, 6)
  otp: string;
}

