const pool =require("../utils/db-config");

module.exports.finduid1= async function(){
    try{
        let uids=await pool.query("select user_id,reportid,task_description from task where (end_date-current_date)=2");
    console.log(uids.rows);
    return uids.rows;
}catch(error){
    console.log(error);
}
    
}

module.exports.findemail=async(uid) =>{
    try{
        let email=pool.query("select email from profile where user_id=$1",[uid]);
        //console.log((await email).rows);
        return (await email).rows[0].email;
    }catch(error){
        console.log(error);

    }
}