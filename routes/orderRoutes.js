const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../auth');
const {verify, verifyAdmin} = auth;
const router = express.Router();

//---------Admin-----------//


router.get("/all", verify, verifyAdmin, orderController.getAllOrders);

router.get("/popularProducts", verify, verifyAdmin, orderController.getPopularProducts);

router.get("/totalRevenue", verify, verifyAdmin, orderController.getTotalRevenue);


//---------User-----------//

router.get("/orderHistory", verify, orderController.getOrderHistory);

router.post('/checkout', verify, orderController.checkOut);

module.exports = router;