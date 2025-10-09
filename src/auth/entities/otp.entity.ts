import { User } from "@/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("otps")
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.otps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Index()
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  otp: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}

