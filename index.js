import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import recordsRoutes from './routes/records.js';
import paymentsRoutes from './routes/payments.js';
import fileUpload from 'express-fileupload'
import { sendMail } from './controllers/sendmail.js';

const app = express();

const corsOptions ={
    origin:"http://localhost:344231/",
    optionsSuccessStatus:200
}
//     "start": "nodemon index.js",
//     "start": "npm index.js",


app.use(bodyParser.json({ limit: '32mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }))
app.use(cors(corsOptions));
app.use(fileUpload())


app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/record', recordsRoutes);
app.use('/payments', paymentsRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Mkulima APP')
})

// sendMail('festaskirui@gmail.com', 'trial', 'hurray \nnice work \nsee you tommorrow');
const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))

    


// const CONNECTION_URL = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'Mkulima_app'
// })

// connecting to database
//   CONNECTION_URL.query(`SHOW DATABASES`,
//         function(err, result){
//             if (err)
//                 console.log(`Error executing the query - ${err}`)
//             else
//             console.log('Result: ', result)
//         });