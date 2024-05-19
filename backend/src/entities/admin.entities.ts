import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { Student } from './student.entities';
import { Role } from './role.entities';
import { Instructor } from './instructors.entities';
import { Enrollment } from './enrollments.entities';
import * as bcrypt from 'bcrypt';

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  admin_id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @OneToMany(() => Student, student => student.admin)
  students!: Student[];

  @OneToMany(() => Instructor, instructor => instructor.admin)
  instructor!: Instructor[];

  @ManyToOne(() => Role, role => role.admins, { nullable: false })
  role!: Role;

  @OneToMany(() => Enrollment, enrollment => enrollment.admin)
  enrollments!: Enrollment[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    } else {
      throw new Error('Password is not set');
    }
  }
}
