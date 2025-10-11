import { Module } from '@nestjs/common';
import { EmailModule } from '@/email/email.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailProcessor } from './email/email.processor';
import { EmailProducer } from './email/email.producer';

@Module({
  imports: [
    EmailModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redis = configService.get('redis');
        return {
          connection: {
            host: redis.host,
            port: redis.port,
            password: redis.password,
          },
        };
      },
    }),
    BullModule.registerQueue(
      { name: 'email' },
      // { name: 'notification' }
    ),
  ],
  providers: [
    EmailProducer,
    EmailProcessor,
  ],
  exports: [EmailProducer],
})
export class JobsModule {}
