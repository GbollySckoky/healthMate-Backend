import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class EmailService {
  private readonly emailFrom: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) {
    const email = this.configService.get('email');
    this.emailFrom = email.from;
  }

  async sendVerificationEmail(to: User, otp: string) {
    const {email, firstName} = to;
    try {
      const mail = await this.mailerService.sendMail({
        to: email,
        subject: 'Email Verification',
        template: 'verification',
        context: {
          otp,
          emailFrom: this.emailFrom,
          firstName,
        },
      });
      return mail;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new InternalServerErrorException(
        'Failed to send verification email',
      );
    }
  }

  async sendPasswordResetEmail(to: User, token: string) {
    const { email, firstName } = to;
    try {
      console.log(`Sending password reset email to ${email} with token: ${token}`);
      const mail = await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset',
        template: 'reset-password',
        context: {
          emailFrom: this.emailFrom,
          firstName,
          resetLink: `${this.configService.get<string>('FRONTEND_URL')}/forgot-password?token=${token}`,
        },
      });
      console.log('Password reset email sent successfully', mail);
      return mail;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new InternalServerErrorException(
        'Failed to send password reset email',
      );
    }
  }
}
