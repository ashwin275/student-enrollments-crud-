
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne } from 'typeorm';

import { Student } from './student.entities';
import { Role } from './role.entities';
import { Instructor } from './instructors.entities';
import { Enrollment } from './enrollments.entities';


@Entity("admin")
export class Admin  {
  @PrimaryGeneratedColumn('uuid')
  admin_id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Student, students => students.admin)
  students!: Student[];

  @OneToMany(() => Instructor, instructor => instructor.admin)
  instructor!: Instructor[];

  @ManyToOne(()=>Role,role =>role.admins)
  role!:Role

  @OneToMany(()=>Enrollment,enrollment =>enrollment.admin)
  enrollments!:Enrollment[];

}
