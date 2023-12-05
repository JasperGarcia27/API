const Order = require('../models/Order');
const Cart = require('../models/Cart');
const cartController = require('../controllers/cartController')
const bcrypt = require('bcrypt');
const auth = require("../auth");

module.exports.getAllOrders = async (req, res) => {
    console.log(req.user.id);

    if (req.user.isAdmin === true) {
        try {
            const orders = await Order.find({});
            res.json(orders);
        } catch (error) {
            // Handle errors here
            console.error(error);
            res.send({ error: 'Error while fetching orders.' });
        }
    } else {
        res.send({ error: 'Unauthorized Access.' });
    }
};


module.exports.getTotalRevenue = async (req, res) => {
	if(user.isAdmin === true) {
		return Order.aggregate([
			{ $match: { bill: {$gte: 0} } },
    		{ $group: { _id: null, totalRevenue: { $sum: "$bill" } } }
    		]).then(result => {
				return result;
		})
	}
	else {
		return 'Unauthorized access';
	}
}

module.exports.getPopularProducts = () => {
	return Order.aggregate([
		{  $unwind: "$products" },
   		{
        	$group: {
           	_id:"$products.name",
           	quantity:{$sum:"$products.quantity"}
        	}
    	},
    	{  
        	$project:{_id: 0, name:"$_id",quantity:"$quantity"}
    } ]).sort( { quantity: -1 } ).limit(10)
}



module.exports.getOrderHistory = (req, res) => {
	return Order.find({userId: req.user.id}).then(result => {
		return result;
	})
}

module.exports.checkOut = async (req, res) => {
  try {
  	const userId = req.user.id;
    const cart = await Cart.findOne({ userId: userId });
    if (cart) {
      const { userId, products, bill } = cart;

      const order = new Order({
        userId: userId,
        products: products,
        bill: bill
      });

      const savedOrder = await order.save();
      console.log(savedOrder.userId);

      await cartController.deleteCart(req, res);

      return savedOrder;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};