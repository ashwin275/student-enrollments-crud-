import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Admin } from './admin.entities';
import { Course } from './courses.entites';
import { Role } from './role.entities';

@Entity("instructor")
export class Instructor {
  @PrimaryGeneratedColumn('uuid')
  instructor_id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToOne(() => Admin, admin => admin.instructor)
  admin!: Admin;

  @OneToMany(() => Course, course => course.instructor)
  courses!: Course[];

  
  @ManyToOne(() => Role, role => role.instructor, { nullable: false })
  role!: Role;
}
