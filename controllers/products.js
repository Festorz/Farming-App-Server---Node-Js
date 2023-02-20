import { upload } from "../middleware/products_middleware.js";
import { pool } from "../database.js";
import { uploadFile } from "./upload.js";

export const getProducts = async (req, res) => {
    const { username } = req.body;

    try {
        pool.query(`SELECT * FROM products WHERE username = '${username}'`,
            (err, result) => {
                if (err) {
                    console.log("error is: ", err);
                }
                res.status(200).json(result.rows);


            })
    } catch (error) {

    }
}


export const addProduct = async (req, res) => {
    const { username, phone, location, country, addedDate, title, price, quantity, description, type } = req.body;
    // const {imageFile} = req.files

    try {
        const imageName = req.files.imageFile.name
        uploadFile(req.files.imageFile, username)
        const imageUrl = `https://festorz.s3.eu-west-1.amazonaws.com/${username}_${imageName}`;

        pool.query(`INSERT INTO products(title, price, quantity, description, imageFile, username, phone, location, country, type, addedDate) VALUES('${title}', ${price}, '${quantity}','${description}', '${imageUrl}', '${username}', '${phone}', '${location}','${country}','${type}','${addedDate}')`,
            (err, result) => {
                if (err) {
                    console.log("error is: ", err);
                }
                res.status(200).json({ message: 'product added' });
            });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Something went wrong' });

    }

}

export const setMarket = async (req, res) => {
    const { id, setMarket } = req.body;
    try {
        pool.query(`UPDATE products SET market = ${setMarket} WHERE id = ${id}`,
            (err, result) => {
                if (err) {
                    console.log("error is: ", err);
                }else{

                
                const msg2 = `Hello admin, \n Product of id ${id} was just added to the market, please go ahead and verify the product.`
                res.status(200).json({ "message": "Product updated successfully." })

                sendMail('festaskirui@gmail.com', 'New product added to market',msg2);
                }
            })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export const setPremium = async (req, res) => {
    const { id, setPremium } = req.body;
    try {
        pool.query(`UPDATE products SET premium = ${setPremium} WHERE id = ${id}`,
            (err, result) => {
                if (err) {
                    console.log("error is: ", err);
                }
                res.status(200).json({ "message": "Product updated successfully." })
            })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}
export const setVerified = async (req, res) => {
    const { id, setVerified } = req.body;
    try {
        pool.query(`UPDATE products SET verified = ${setVerified} WHERE id = ${id}`,
            (err, result) => {
                if (err) {
                    console.log("error is: ", err);
                }
                res.status(200).json({ "message": "Product updated successfully." })
            })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export const getMarket = async (req, res) => {
    const select = true;
    const { country } = req.body;
    try {
        pool.query(`SELECT * FROM products WHERE market = ${select} AND verified = ${select} ORDER BY premium DESC`,
            (err, result) => {
                if (err) {
                    console.log("error is: ", err);
                }
                res.status(200).json(result.rows);


            })
    } catch (error) {

    }
}
export const getUnverifiedMarket = async (req, res) => {
    const select = true;
    try {
        pool.query(`SELECT * FROM products WHERE market = ${select} AND verified = ${false}`,
            (err, result) => {
                if (err) {
                    console.log("error is: ", err);
                }
                res.status(200).json(result.rows);


            })
    } catch (error) {

    }
}