import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AdminsModule } from './admins/admins.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { BranchesModule } from './branches/branches.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatsModule } from './chats/chats.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [UsersModule, PatientsModule, AuthModule, DoctorsModule, AdminsModule, HospitalsModule, BranchesModule, AppointmentsModule, ConsultationsModule, PaymentsModule, ChatsModule, SupportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
