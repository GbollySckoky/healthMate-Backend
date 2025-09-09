// src/auth/dto/create-doctor.dto.ts
import { IsString } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class CreateDoctorDto extends CreateAuthDto {
  @IsString()
  bio: string;
  
  @IsString()
  dob: string;

  @IsString()
  fullName: string;

  @IsString()
  gender: string;

  @IsString()
  specialization: string;

  @IsString()
  licenseNumber: string;

  @IsString()
  yearsOfExperience: string;

  @IsString()
  hospitalId: string; // link doctor to hospital
}
