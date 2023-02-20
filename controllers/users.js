import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from "../database.js";
import { sendMail } from './sendmail.js';


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        pool.query(`SELECT * FROM users WHERE email='${email}'`,
            (error, result) => {
                console.log("error: ", error)
                if (result.rows[0] === undefined) {
                    return res.status(400).json({ message: "User doesn't exist!" })
                }
                else {
                    const pass = result.rows[0].password;
                    const username = result.rows[0].username;

                    const isPasswordCorrect = bcrypt.compareSync(password, pass)
                    if (!isPasswordCorrect) {
                        return res.status(404).json({ message: 'Incorrect Password ' });
                    }
                    else {
                        const token = jwt.sign({ email, username }, 'test', { expiresIn: '10h' })
                        // console.log(result.rows[0]);
                        res.status(200).json({ data: result.rows[0], token: token });
                    }
                }
                // pool.end();
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }

}


export const signUp = async (req, res) => {
    try {
        const { username, phone, country, town, email, password, confirmPassword } = req.body;
        pool.query(`SELECT * FROM users WHERE username='${username}' OR email='${email}' OR phone='${phone}'`,
            (error, result) => {
                if (error) {
                    console.log("error: ", error);

                }
                // console.log("responds is: ", result.rows[0])
                if (result.rows[0] !== undefined) {
                    return res.status(400).json({ error: "User with that email or username or phone already exist!" })
                }

                else if (password !== confirmPassword) {
                    return res.status(400).json({ message: "Password don't match" })
                } else {
                    const hashedPassword = bcrypt.hashSync(password, 12)

                    const token = jwt.sign({ email, username }, 'test', { expiresIn: '10h' })

                    pool.query(`INSERT INTO users(username, phone, email, country, town, password) VALUES('${username}','${phone}', '${email}','${country}','${town}','${hashedPassword}')`,
                        (err, result) => {
                            if (err) {

                                console.log("error is: ", err);
                            }
                            const msg = `Hello ${username}, \nYour registration was successful, welcome to Mkulima app, if you have any questions please feel free to contact us through this email. Thank you.`

                            const msg2 = `Hello admin, \n${username} just registered at mkulima app. \nOrigin is ${country}, \ntown is ${town}, \nphone number:${phone} \nand email is ${email}.\nAgain welcome sir, this app is dope.`

                            res.status(200).json({ username, phone, country, town, email, token, premium:false, market:false, upload:false });
                            sendMail(email, 'Mkulima registration',msg);
                            sendMail('festaskirui@gmail.com', 'New registration',msg2);
                        });

                }
            }
        );
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const getUser = async (req, res) => {
    try {
        const { username } = req.body;
        pool.query(`SELECT premium, market, upload, diagnose FROM users WHERE username='${username}'`,
            (error, result) => {
                if (error) {
                    console.log("error: ", error)
                }
                res.status(200).json({ data: result.rows[0]});

            });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }

}