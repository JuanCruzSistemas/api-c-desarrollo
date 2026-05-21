import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRol } from "./types/user-role.enum";

@Entity('users_auth')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    passwordHash!: string;

    @Column({ type: 'text', default: UserRol.USER })
    role!: UserRol;
}