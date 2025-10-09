import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class EmailProducer {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async sendVerificationEmail(user: User, otp: string) {
    await this.emailQueue.add('send-verification', { user, otp }, {
      attempts: 3,
      backoff: { type: 'fixed', delay: 5000 },
    });
  }

  async sendPasswordResetEmail(user: User, token: string) {
    await this.emailQueue.add('send-password-reset', { user, token }, {
      attempts: 3,
      backoff: { type: 'fixed', delay: 5000 },
    });
  }
}

