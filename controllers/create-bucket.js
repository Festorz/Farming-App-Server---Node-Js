import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'})

const s3 = new AWS.S3({
    accessKeyId:process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET
});

const params = {
    Bucket:process.env.BUCKET_NAME,
    CreateBucketConfiguration:{
        LocationConstraint:'eu-west-1'
    }
};

s3.createBucket(params, function(err, data){
    if(err) console.log(err, err.stack);
    else console.log('Bucket created Successfully', data.Location);
})
