import { pool } from "../../../database.js";
import { sendMail } from "../../sendmail.js";

export const mpesaResponse = async (req, res) => {
    const { stkCallback } = req.body.Body;
    var responseCode = stkCallback['ResultCode']
    try {
        if (responseCode == 0) {
            const transactionID = stkCallback['MerchantRequestID']
            const data = stkCallback['CallbackMetadata']
            const amount = data.Item[0]['Value']
            const receiptNumber = data.Item[1]['Value']
            const t_date = data.Item[3]['Value']
            const phone = data.Item[4]['Value']

            pool.query(`INSERT INTO mpesa(phoneNumber,transactionID, amount, transactionDate, receiptNumber) VALUES('${phone}','${transactionID}',${amount}, '${t_date}','${receiptNumber}')`,
                (err, result) => {
                    if (err) {
                        console.log("error is: ", err);
                    }
                });

            sendMail('festaskirui@gmail.com', 'New successful mkulima subscription', 
            `A user just made a subscription of amount: ${amount}, and phone number is ${phone}, its furahi day.`);

            switch (amount) {
                case 200:
                    pool.query(`UPDATE users SET upload = true WHERE transactionID = '${transactionID}'`,
                        (err, result) => {
                            if (err) {
                                console.log("user updating error is: ", err);
                            }
                            res.status(200).json({ message: 'updated successfully...' });
                        });
                    break;

                case 500:
                    pool.query(`UPDATE users SET market = true WHERE transactionID = '${transactionID}'`,
                        (err, result) => {
                            if (err) {
                                console.log("user updating error is: ", err);
                            }
                            res.status(200).json({ message: 'updated successfully...' });
                        });
                    break;

                case 1000:
                    pool.query(`UPDATE users SET premium = true WHERE transactionID = '${transactionID}'`,
                        (err, result) => {
                            if (err) {
                                console.log("user updating error is: ", err);
                            }

                        });
                    pool.query(`SELECT username FROM users WHERE transactionID = '${transactionID}'`,
                        (err, result) => {
                            if (err) {
                                console.log("error getting username: ", err);
                            }
                            var name = result.rows[0].username;
                            console.log('ur name is ', name);

                            pool.query(`UPDATE products SET premium=true WHERE username='${name}'`,
                                (err, result) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    console.log('operation was successfurry....!')

                                })
                        });
            }
        }

    } catch (error) {

    }
}