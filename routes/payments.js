import express from 'express';
import {lipaNaMpesaOnline} from '../controllers/payments/mpesa/lipaNaMpesa.js';
import {getOAuthToken} from '../controllers/payments/mpesa/mpesaAuthToken.js'
import {mpesaResponse} from '../controllers/payments/mpesa/mpesaResponse.js'

const router = express.Router();

router.post('/mpesa', getOAuthToken, lipaNaMpesaOnline);
router.post('/mpesaResponse', mpesaResponse);

export default router;