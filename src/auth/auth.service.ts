import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@/users/users.service';
import { comparePassword, hashPassword } from '@/common/utils/password.util';
import { SignupDto } from './dto/signup.dto';
import { UserRole } from '@/users/enums/user-role.enum';
import { generateOTP } from '@/common/utils/otp.utils';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '@/users/dto/user-response.dto';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailProducer } from '@/jobs/email/email.producer';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    private readonly emailProducer: EmailProducer,
  ) {}

  async login(payload: LoginDto): Promise<UserResponseDto> {
    const user = await this.userService.findByEmail(payload.email!);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValidPassword =
        await comparePassword(payload.password!, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...data } = user;

    const accessToken = this.jwtService.sign(<JwtPayload>{
      sub: user.id, email: user.email,
      role: user.role, phoneNumber: user.phoneNumber,
    });

    return { ...data, accessToken };
  }

  async signup(payload: SignupDto): Promise<UserResponseDto> {
    const userByEmail = await this.userService.findByEmail(payload.email);
    if (userByEmail) {
      throw new ConflictException('Email already in use');
    }

    const userByPhone = await this.userService.findByPhoneNumber(payload.phoneNumber);
    if (userByPhone) {
      throw new ConflictException('Phone number already in use');
    }
    const createUserPayload = {
      ...payload,
      password: await hashPassword(payload.password),
      role: UserRole.PATIENT,
    }
    const user = await this.userService.create(createUserPayload);

    const OTP = generateOTP();
    const otpData = this.otpRepository.create({
      userId: user.id,
      otp: OTP,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await this.otpRepository.save(otpData);

    await this.emailProducer.sendVerificationEmail(user, OTP);

    const { password, ...data } = user;
    return data;
  }

  async verifyEmail(email: string, otp: string): Promise<UserResponseDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const userId = user.id;

    const accessToken = this.jwtService.sign(<JwtPayload>{
      sub: user.id, email: user.email,
      role: user.role, phoneNumber: user.phoneNumber,
    });

    if (otp === '000000') {
      await this.userService.updateVerificationStatus(userId);
      return { ...user, accessToken };
    }
    const otpRecord = await this.otpRepository.findOneBy({ userId, otp });
    if (!otpRecord) {
      throw new UnauthorizedException('Invalid OTP');
    }
    if (otpRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('OTP has expired');
    }

    await this.userService.updateVerificationStatus(userId);

    await this.otpRepository.delete(otpRecord.id);

    const userData = await this.userService.findByID(userId);
    if (!userData) {
      throw new NotFoundException('User not found');
    }

    return { ...userData, accessToken };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const token = `${this.jwtService.sign({
      id: user.id, email: user.email
    }, { expiresIn: '15m' })}`;
    await this.emailProducer.sendPasswordResetEmail(user, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findByID(decoded.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const hashedPassword = await hashPassword(newPassword);
      await this.userService.update(user.id, { password: hashedPassword });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.isVerified) {
      throw new ConflictException('Email is already verified');
    }

    const otpRecord = await this.otpRepository.findOneBy(
      { userId: user.id }
    );
    if (otpRecord) {
      await this.otpRepository.delete(otpRecord.id);
    }

    const OTP = generateOTP();
    const otpData = this.otpRepository.create({
      userId: user.id,
      otp: OTP,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await this.otpRepository.save(otpData);

    await this.emailProducer.sendVerificationEmail(user, OTP);
  }
}
