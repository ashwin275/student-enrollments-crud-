import { Request, Response } from 'express';
import { Student } from '../entities/student.entities';
import { Like } from 'typeorm';
import { getRepository } from 'typeorm';
import { isDuplicateKeyError } from '../utils/error.utils';
import { StudentRepository } from '../repositories';
import { UUID } from 'crypto';
import { error } from 'console';

export const s_create_student = async(req:Request,res:Response)=>{

    try{

  
        const{email,name,age,phone_no,dob,role_id,admin_id} = req.body;

        const new_student = await Student.save({
           
            email:email,
            name:name,
            age:age,
            phone_no:phone_no,
            dob:dob,
            role:role_id,
            admin:admin_id
        })
        return res.status(201).json(new_student)
    } catch(error){
        if (isDuplicateKeyError(error)) {

            return res.status(400).json({ error: true, message: "Student already exists" });
        } 
        
        else if (error instanceof Error) {
            res.status(400).json({ error: true, message: error.message || "Student not created" });
        } else {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
}


export const s_all_students = async (req: Request,res:Response) => {
    const student_id:any  = req.query.student_id;
    
    if (student_id) {
        try{
            const student = await Student.findOne({ where: { student_id: student_id } });
             if (!student) {
                return res.status(404).json({ error: "Student Not Found" });
            }
            return res.status(201).json(student)
        } catch (error){
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    const all_students =  await Student.find();
  
    return res.status(200).json(all_students)
}

export const s_search_students = async (req: Request, res: Response) => {
    const { name, email } = req.query;

  
    if (name || email) {
        let students;

        if (name) {
            students = await Student.find({
                where: {
                    name: Like(`%${name}%`)
                }
            });
        }

        if (email) {
            students = await Student.find({
                where: {
                    email: Like(`%${email}%`)
                }
            });
        }

        return res.status(200).json(students);
    } else {
        return res.status(400).json({ error: "Either name or email must be provided" });
    }
};

export const s_delete_student = async(req:Request,res:Response) =>{

    const  student_id  = req.query.student_id as UUID;
     
    if(student_id){
        const student = await Student.findOne({
            where:{
                student_id:student_id
            }
        });
        if(student){
          await Student.remove(student)
          return res.status(200).json({
            data: student,
            message: `Successfully updated student with email: ${student.email}`
          })
        }else{
            return res.status(404).json({error:true,message:"student not found"})
        }
    }else{
        return res.status(400).json({error:true,message:"student id required"})
    }

   
}

export const s_update_user = async (req: Request, res: Response) => {
    const  student_id  = req.query.student_id as UUID;
    const { name, email, age, phone_no } = req.body;


    try {
        const studentRepository = getRepository(Student);
        const student = await studentRepository.findOne({ where: { student_id: student_id } });

        if (!student) {
            return res.status(404).json({ message: "student not found" });
        }

        if (name) student.name = name;
        if (email) student.email = email;
        if (age) student.age = age;
        if (phone_no) student.phone_no = phone_no;

        const updated_student = await studentRepository.save(student);

        return res.status(200).json({
            data: updated_student,
            message: `Successfully updated student with email: ${updated_student.email}`
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
};
