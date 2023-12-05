const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../auth');
const {verify, verifyAdmin} = auth;

// Get the cart of the current user; no reqbody

router.get("/viewcart", verify, cartController.getCart);

router.post("/addtocart", verify, cartController.addToCart);

router.delete("/deletecart", verify, cartController.deleteCart);

router.delete("removeproduct/:productId", verify, cartController.removeProduct);


module.exports = router;