import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Admin } from './admin.entities';

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn('uuid')
  role_id!: string;

  @Column({ unique: true })
  role_name!: string;

  @OneToMany(() => Admin, admin => admin.role)
  admins!: Admin[];
}
