import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    password: string;
}
