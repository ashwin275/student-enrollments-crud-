import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Student } from './student.entities';
import { Course } from './courses.entites';
import { Admin } from './admin.entities';

@Entity("enrollments")
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  enrollment_id!: string;

  @ManyToOne(() => Student, student => student.enrollments)
  student!: Student;

  @ManyToOne(() => Course, course => course.enrollments)
  course!: Course;

  @Column('date')
  created_at!: Date;

  @Column('date')
  modified_at!: Date;

  @ManyToOne(() => Admin, admin => admin.enrollments)
  admin!: Admin;
}
