import { applyDecorators, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "../dto/login.dto";
import { UserResponseDto } from "@/user/dto/user-response.dto";
import { SignupDto } from "../dto/signup.dto";

const controller = applyDecorators(
  Controller('auth'),
);

const login = applyDecorators(
  Post("login"),
  HttpCode(HttpStatus.OK),
  ApiBody({ type: LoginDto }),
  ApiCreatedResponse({ type: UserResponseDto }),
  ApiOperation({ summary: "User login" }),
);

const signup = applyDecorators(
  Post("signup"),
  ApiBody({ type: SignupDto }),
  ApiCreatedResponse({ type: UserResponseDto }),
  ApiOperation({ summary: "User signup" }),
);

const verifyEmail = applyDecorators(
  Post("verify-email"),
  ApiOperation({ summary: "Verify user's email" }),
);

const forgotPassword = applyDecorators(
  Post("forgot-password"),
  ApiOperation({ summary: "Send password reset link to user's email" }),
);

const resetPassword = applyDecorators(
  Post("reset-password"),
  ApiOperation({ summary: "Reset user's password" }),
);

const resendVerification = applyDecorators(
  Post("resend-verification"),
  ApiOperation({ summary: "Resend email verification OTP" }),
);

export const AuthDecorators = {
  Controller: controller,
  Login: login,
  Signup: signup,
  VerifyEmail: verifyEmail,
  ForgotPassword: forgotPassword,
  ResetPassword: resetPassword,
  ResendVerification: resendVerification,
}
