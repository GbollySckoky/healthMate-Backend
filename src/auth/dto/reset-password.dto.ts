import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({ example: 'newStrongPassword123!', description: 'New password for the user' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  newPassword: string;

  @ApiProperty({ example: 'resetToken12345', description: 'Token received for password reset' })
  @IsString()
  token: string;
}
