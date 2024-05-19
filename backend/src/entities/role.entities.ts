import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Admin } from './admin.entities';
import { Student } from './student.entities';

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn('uuid')
  role_id!: string;

  @Column({ unique: true })
  role_name!: string;

  @Column('text')
  description!: string;

  @OneToMany(() => Admin, admin => admin.role)
  admins!: Admin[];

  @OneToMany(() => Admin, admin => admin.role)
  student!: Student[];

  @OneToMany(() => Admin, admin => admin.role)
  instructor!: Student[];
}
