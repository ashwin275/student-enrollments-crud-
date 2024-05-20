
export const adminStudentRelation = (admin:any,admin_id:any) =>{
    console.log(admin)
    console.log(admin_id)
    
    if (admin && (admin.id ==admin_id)){
      
        return true
    }
    
    return false
};