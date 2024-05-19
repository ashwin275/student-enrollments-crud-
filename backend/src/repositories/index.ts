import { getRepository } from 'typeorm';
import { Role } from '../entities/role.entities';
import { Admin } from '../entities/admin.entities';
import { Student } from '../entities/student.entities';


export const RoleRepository = getRepository(Role);
export const AdminRepository = getRepository(Admin);
export const StudentRepository = getRepository(Student);
