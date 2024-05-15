import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Admin } from './admin.entities';
import { Course } from './courses.entites';

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
}
