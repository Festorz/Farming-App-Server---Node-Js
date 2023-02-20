import axios from 'axios';
import dotenv from 'dotenv'
import dayjs from 'dayjs';
import { pool } from '../../../database.js';

dayjs.locale('et');


dotenv.config({path:"../../.env"})

export const lipaNaMpesaOnline = async(req, res) =>{
    const {username, phonenumber, amount} = req.body;
    const  token = req.token;
    // console.log('token @ lipa is', token)
    const auth = `Bearer ${token}`;
     
    const phone = phonenumber;

    const date = new Date().getTime()
    var timeStamp = dayjs(date).format("YYYYMMDDHHmmss")
    // console.log(timeStamp);
    const bs_shortcode = process.env.business_shortcode;
    
    const shortcode = process.env.shortcode;
    const passkey = process.env.lipa_na_mpesa_passkey;

    const url = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const password = new Buffer.from(`${bs_shortcode}${passkey}${timeStamp}`).toString('base64');
    const transaction_type = 'CustomerBuyGoodsOnline';
    const callbackurl = 'https://mkulima-app.herokuapp.com/payments/mpesaResponse';
    try {
       const {data} = await axios.post(url, {
           "BusinessShortCode":bs_shortcode,
           "Password":password,
           "Timestamp":timeStamp,
           "TransactionType":transaction_type,
           "Amount":amount,
           "PartyA":phone,
           "PartyB":shortcode,
           "PhoneNumber": phone,
           "CallBackURL":callbackurl,
           "AccountReference":'shortcode',
           "TransactionDesc":'Subscribe to Mkulima App'
       },
       {"headers":{"Authorization":auth}}
       ).catch(console.log); 

       const {MerchantRequestID} = data;
    //    todo
       pool.query(`UPDATE users SET transactionID='${MerchantRequestID}' WHERE username='${username}'`,
       (err, result)=>{
           
        if (err) {
            console.log("error is: ", err);                    
        }
       })
       return res.send({success:true, message:"operation completed"});

    } catch (err) {
        return res.send({success:false, message:"error occured"});
    }

}