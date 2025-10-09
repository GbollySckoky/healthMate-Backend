import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HandlebarsAdapter
} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const email = configService.get('email');
        const host = email.host;
        const port = email.port;
        const user = email.username;
        const pass = email.password;
        const from = email.from;

        return {
          transport: {
            host,
            port,
            secure: false,
            auth: {
              user,
              pass,
            },
            pool: true,
            connectionTimeout: 5 * 60 * 1000, // 5 minutes
          },
          defaults: {
            from: `${from} <${user}>`,
          },
          template: {
            dir: join(process.cwd(), 'src/email/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }
      },
    })
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
