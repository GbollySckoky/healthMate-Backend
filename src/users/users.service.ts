import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { comparePassword, hashPassword } from '@/common/utils/password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // DataSource injection (if needed) to run raw SQL queries, transactions,
    // etc...
    // private dataSource: DataSource,
  ) {
    // this.dataSource.query('SELECT * FROM users');
    // const userRepo = this.dataSource.getRepository(User);
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(payload);
    return await this.userRepository.save(user);
  }

  async findByID(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ phoneNumber });
    if (!user) {
      return null;
    }
    return user;
  }

  async updateVerificationStatus(userId: string, isVerified: boolean = true): Promise<void> {
    await this.userRepository.update({ id: userId }, { isVerified });
  }

  findAll() {
    return this.userRepository.find();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async changePassword(
    id: string, oldPassword: string, newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await comparePassword(oldPassword, user.password)
    if (!isValid) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.password = await hashPassword(newPassword);
    await this.userRepository.save(user);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
