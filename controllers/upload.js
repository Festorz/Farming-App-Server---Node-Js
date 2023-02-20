import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config({path:'../.env'})
// console.log(process.env.BUCKET_NAME)

 export const uploadFile = (fileName, username) =>{
     console.log(`file is ${fileName}`)
    const name = fileName.name;
    const fileContent = fileName.data;

    const params = {
        Bucket:process.env.BUCKET_NAME,
        Key:`${username}_${name}`,
        ContentType:'image/jpeg',
        Body:fileContent
    };
    const s3 = new AWS.S3({
        accessKeyId:process.env.AWS_ID,
        secretAccessKey:process.env.AWS_SECRET
    });

   s3.upload(params, function(err, data){
        if(err){
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`)
    }) 
    // console.log(`location is ${loc}`)
}

