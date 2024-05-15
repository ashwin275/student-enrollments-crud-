import { Request } from 'express';
import { Student } from '../entities/student.entities';
import { Like } from 'typeorm';


export const s_create_student = async(req:Request)=>{
        const{email,name,age,phone_no,dob} = req.body;

        const new_student = await Student.save({
           
            email:email,
            name:name,
            age:age,
            phone_no:phone_no,
            dob:dob
        })
        return new_student;
}


export const s_all_students = async (req: Request) => {
    const student_id:any  = req.query.student_id;
    console.log(student_id)
    if (student_id) {
        try{
            const student = await Student.findOne({ where: { student_id: student_id } });
             if (!student) {
                throw new Error('Student not found');
            }
            return [student];
        } catch (error){
            console.error(error);
            throw new Error('Database error');
        }
    }
    return Student.find();
}

export const s_search_students = async(req:Request) =>{
  const {name} = req.query;
  if(name){
       const students  = await Student.find({where:{
        name:Like(`%${name}%`)
       }})

    return students
  }else{
    return "provide valid name to search"
  }
}


export const s_delete_student = async(req:Request) =>{
    const student_id:any  = req.params.student_id;
    if(student_id){
        const student = await Student.findOne({
            where:{
                student_id:student_id
            }
        });
        if(student){
          await Student.remove(student)
          return true
        }else{
            return "user not found"
        }
    }

   
}

export const s_update_user = async(req:Request)=>{

    const student_id:any  = req.params.student_id;
    const{name,email,age,phone_no} = req.body;
    if (!name || !email || !age || !phone_no){
        return "data missing"

    }else{
        const x = Student.update({student_id:student_id},{name:name,email:email,age:age,phone_no:phone_no});
        return x
    }

}