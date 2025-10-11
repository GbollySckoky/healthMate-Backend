import { EmailService } from '@/email/email.service';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job<any, any, string>) {
    console.log('Processing email job:', job.name, job.data);

    if (job.name === 'send-verification') {
      await this.emailService.sendVerificationEmail(
        job.data.user, job.data.otp
      );
    }

    if (job.name === 'send-password-reset') {
      await this.emailService.sendPasswordResetEmail(
        job.data.user, job.data.token
      );
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.error(`Email job ${job.id} failed:`, error);
  }
}

