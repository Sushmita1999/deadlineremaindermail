const express = require('express');
const cron=require('node-cron');
const finduid=require('./modules/finduid');
const nodemailer=require('nodemailer');


const app =express();
//app.use(express.json());
//app.use(express.urlencoded({
 //   extended:'true'
//}));

//const date = require('./router/router')
//app.use('/',date);

//const Rdate =require('./modules/datemodel');

console.log("program running");
cron.schedule(" 15 24 * * *", async function(){
    console.log("Inside the schedular");
        let uuid=await finduid.finduid1();
        //console.log(uuid);
        if(uuid===null){
            console.log("no email sent to anyone");
        }
        else{
            console.log("continue");
            uuid.forEach(async element => {
               var userid=element.user_id;
                console.log(userid);
                email= await finduid.findemail(userid);
                console.log(email);
                const transporter=nodemailer.createTransport({
                    host:"smtp.gmail.com",
                    port:587,
                    secure:false,
                    auth:{
                        user:'hbcsjdhbh',
                        pass:'jbacjhbdsh'
                    },
                    tls:{rejectUnauthorized:false
                    }
                })
                console.log("transporter is also done");
                const mailoptions={
                    from:"hbgfdhzvyyfdh",
                    to:`${email}`,
                    subject:"Email verification",
                    text:`Hi after 2 days you have your deadline for the task ${element.task_description}`,
                    
                }
                transporter.sendMail(mailoptions,(err,res)=>{
                    if(err){
                        console.log("there was a error",err)
                    }else{
                        console.log("Here is a response",res);
                        res.status(200).json("recovery mail sent");
                        res.json({key:"mailsent"});
                    }
                })
                console.log("mail sent !!!!!")
    


            });
        }
})


app.listen(process.env.PORT || 9000, function() {
  console.log("server started at port 9000");
});