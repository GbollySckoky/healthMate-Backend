import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";
import { Otp } from "@/auth/entities/otp.entity";
import { Exclude } from "class-transformer";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  phoneNumber: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @Column({default: false})
  isVerified: boolean;

  @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
  role: UserRole;

  @OneToMany(() => Otp, otp => otp.user, { cascade: true })
  otps: Otp[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
