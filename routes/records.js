import express from 'express';
import { addRecord, deleteRecord, getRecords } from '../controllers/records.js';
const router = express.Router();

router.post('/add',addRecord);
router.post('/getRecords', getRecords);
router.post('/deleteRecord', deleteRecord);

export default router;