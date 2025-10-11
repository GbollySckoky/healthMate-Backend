import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AuthModule } from './auth/auth.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { BranchesModule } from './branches/branches.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { ChatsModule } from './chats/chats.module';
import { SupportModule } from './support/support.module';
import { AdminsModule } from './admins/admins.module';
import { JobsModule } from './jobs/jobs.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import emailConfig from './config/email.config';
import redisConfig from './config/redis.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import paystackConfig from './config/paystack.config';

@Module({
  imports: [
    AuthModule, UsersModule, PatientsModule,
    DoctorsModule, AdminsModule, HospitalsModule,
    BranchesModule, AppointmentsModule, ConsultationsModule,
    ChatsModule, SupportModule, PaymentModule, JobsModule, EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      load: [
        emailConfig,
        databaseConfig,
        redisConfig,
        jwtConfig,
        paystackConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('database');
        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          // entities: [User],
          autoLoadEntities: true,
          // synchronize: true,
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          migrationsRun: true,
          // cli: {
          //   migrationsDir: 'src/migrations',
          // },
          // namingStrategy: ...
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
