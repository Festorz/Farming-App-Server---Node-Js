import express from "express";
import { addProduct, getMarket, getProducts, getUnverifiedMarket, setMarket, setPremium, setVerified } from "../controllers/products.js";
import { upload } from "../middleware/products_middleware.js";

const router = express.Router();

router.post('/add', addProduct);
router.post('/getProducts', getProducts);
router.post('/setmarket', setMarket);
router.post('/setpremium', setPremium);
router.post('/getMarket', getMarket);
router.get('/unverifiedMarket', getUnverifiedMarket);
router.post('/setVerified', setVerified);

export default router;