// src/auth/dto/create-hospital.dto.ts
import { IsString } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class CreateHospitalDto extends CreateAuthDto {
  @IsString()
  hospitalName: string;

  @IsString()
  address: string;
}
