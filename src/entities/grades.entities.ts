import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './student.entities';
import { Course } from './courses.entites';

@Entity("grades")
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  grade_id!: string;

  @ManyToOne(() => Student, student => student.grades)
  student!: Student;

  @ManyToOne(() => Course, course => course.grades)
  course!: Course;

  @Column()
  grade!: string;

  @Column('float')
  cgpa!: number;
}
