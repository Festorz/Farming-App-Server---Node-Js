import { pool } from "../database.js";


export const getRecords = async (req, res) =>{
    const {username} = req.body;
    try {
        pool.query(`SELECT * FROM records WHERE username = '${username}'`,
        (err, result) =>{
            if(err){
                console.log("error is: ", err);
            }
            res.status(200).json(result.rows);
        })
    } catch (error) {
        
    }
}


export const addRecord = async (req, res) => {
    const {username, title, description, plans, expense, profit, addedDate} = req.body;
    try {
        pool.query(`INSERT INTO records(username, title, description, expense, profit, plans, addedDate) VALUES('${username}', '${title}', '${description}', ${expense}, ${profit},'${plans}','${addedDate}')`,
        (err, result)=>{
            if(err){
                console.log('error is: ', err)
            }
            res.status(200).json({message:'record saved successfully'});
        });
        
    } catch (error) {
        res.status(400).send(error);
        
    }
}
export const deleteRecord = async (req, res) => {
    const {id} = req.body;
    try {
        pool.query(`DELETE FROM records WHERE id = ${id}`,
        (err, result)=>{
            if(err){
                console.log('error is: ', err)
            }
            res.status(200).json({message:'record deleted!!'});
        });
        
    } catch (error) {
        res.status(400).send(error);
        
    }
}