
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

const port = 4010;

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/b10/users', userRoutes);
app.use('/b10/products', productRoutes);
app.use('/b10/orders', orderRoutes);
app.use('/b10/cart', cartRoutes);



// [Section] Database Connection
mongoose.connect("mongodb+srv://jaspergarcia200127:admin123@course-booking.kxhpoat.mongodb.net/Backend_Test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now Connected to MongoDB Atlas'));

if(require.main === module){
	app.listen(process.env.PORT || port, () =>{
		console.log(`API is now online on port ${process.env.PORT || port}`)
	})
}

module.exports = app;