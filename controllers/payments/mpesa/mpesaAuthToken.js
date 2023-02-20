import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config({path:"../../.env"})


export const getOAuthToken = async (req, res, next)=>{
 const consumer_key = process.env.consumer_key;
 const consumer_secret = process.env.consumer_secret;
 const url = 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

 const buffer  = new Buffer.from(consumer_key+":"+consumer_secret);

 const auth = `Basic ${buffer.toString('base64')}`;

 try {
     const {data} = await axios.get(url, {"headers":{"Authorization":auth}});

     req.token = data['access_token'];
    //  console.log('token is ',data)

     return next();

    } catch (err) {
        // console.log('error encountered')
        return res.send({sucess:false, message:err});
     
 }
}