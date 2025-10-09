import { Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthDecorators } from './decorators/auth.decorators';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';

@AuthDecorators.Controller
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @AuthDecorators.Login
  async login(@Body() payload: LoginDto) {
    const user = await this.authService.login(payload);
    return user;
  }

  @AuthDecorators.Signup
  async signUp(@Body() payload: SignupDto) {
    return await this.authService.signup(payload);
  }

  @AuthDecorators.VerifyEmail
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return await this.authService.verifyEmail(body.email, body.otp);
  }

  @AuthDecorators.ForgotPassword
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    return await this.authService.forgotPassword(payload.email);
  }

  @AuthDecorators.ResetPassword
  async resetPassword(@Body() payload: ResetPasswordDto) {
    return await this.authService.resetPassword(payload.token, payload.newPassword);
  }

  @AuthDecorators.ResendVerification
  async resendVerificationEmail(@Body() body: ResendVerificationDto ) {
    return await this.authService.resendVerificationEmail(body.email);
  }
}
