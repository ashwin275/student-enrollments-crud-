import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Enrollment } from './enrollments.entities';
import { Instructor } from './instructors.entities';
import { Grade } from './grades.entities';

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn('uuid')
  course_id!: string;

  @Column()
  course_code!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('float')
  credit_hours!: number;

  @ManyToOne(() => Instructor, instructor => instructor.courses)
  instructor!: Instructor;

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments!: Enrollment[];

  @OneToMany(() => Grade, grade => grade.course)
  grades!: Grade[];
}
