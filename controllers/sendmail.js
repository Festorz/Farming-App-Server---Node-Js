import nodemailer from 'nodemailer';


export const sendMail = (receiver, subject, msg) =>{

    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'rivjordan654@gmail.com',
            pass:'qqrxwgqfugbxfgps'
        }
    });
    
    const mailOptions = {
        from:'rivjordan654@gmail.com',
        to:receiver,
        subject:subject,
        text:msg,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log('sent ooohhhhhhhh');
            console.log('Email sent: ', info.response)
        }
    })
}