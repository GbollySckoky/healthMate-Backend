import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';
import { Match } from '../../decorators/match.decorator';


export class CreateAuthDto {
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    // minNumbers: 1,
    // minSymbols: 1,
  })
  password: string;

  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @IsPhoneNumber('NG') 
  phoneNumber: string;

  @IsEmail()
  email: string;
}
