import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guards";
import { RolesGuard } from "@/common/guards/roles.guard";
import { applyDecorators, Controller, Delete, Get, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

const controller = applyDecorators(
  Controller('users'),
  ApiBearerAuth('access-token'),
  UseGuards(JwtAuthGuard, RolesGuard),
);

const getUserProfile = applyDecorators(
  Get(''),
  ApiOperation({ summary: "Get current user's profile" }),
);

const updateUser = applyDecorators(
  Patch(''),
  ApiOperation({ summary: "Update current user's profile" }),
);

const changePassword = applyDecorators(
  Patch('change-password'),
  ApiOperation({ summary: "Change current user's password" }),
);

const deleteUser = applyDecorators(
  Delete(''),
  ApiOperation({ summary: "Delete current user's account" }),
);

export const UsersDecorators = {
  Controller: controller,
  GetUserProfile: getUserProfile,
  UpdateUser: updateUser,
  ChangePassword: changePassword,
  DeleteUser: deleteUser,
}

