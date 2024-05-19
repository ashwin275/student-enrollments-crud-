
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

import { Admin } from "./admin.entities";
import { Enrollment } from "./enrollments.entities";
import { Major } from "./major.entity";
import { Grade } from "./grades.entities";
import { Role } from "./role.entities";

@Entity("students")
export class Student extends BaseEntity  {
    @PrimaryGeneratedColumn("uuid") 
    student_id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    age!: number;

    @Column({ nullable: true })
    phone_no!: string;

    @Column({ type: "date", nullable: true })
    dob!: Date;

    @OneToMany(()=>Major,major=>major.students)
    major!:Major

    @ManyToOne(() => Admin, admin => admin.students,{ nullable: false })
    admin!: Admin;

    @OneToMany(()=>Enrollment,enrollment => enrollment.student)
    enrollments!:Enrollment[];

    @OneToMany(()=>Grade,grade=>grade.student)
    grades!:Grade[];

    @ManyToOne(() => Role, role => role.student, { nullable: false })
    role!: Role;
  
}
