import { Controller, Body } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDecorators } from './decorators/users.decorators';
import { UsersService } from './users.service';
import { AuthUser } from '@/auth/types/auth-user.type';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsersDecorators.GetUserProfile
  getUserProfile(
    @GetUser() user: AuthUser
  ) {
    return this.usersService.findByID(user.userId);
  }

  @UsersDecorators.UpdateUser
  update(
    @GetUser() { userId }: AuthUser,
    @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @UsersDecorators.ChangePassword
  async changePassword(
    @GetUser() { userId }: AuthUser,
    @Body() body: { oldPassword: string, newPassword: string }
  ) {
    return this.usersService.changePassword(
      userId, body.oldPassword, body.newPassword
    );
  }

  @UsersDecorators.DeleteUser
  remove(@GetUser() user: AuthUser) {
    return this.usersService.remove(user.userId);
  }
}
