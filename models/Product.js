const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
	
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: true,
  // },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  userOrders: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
})

module.exports = mongoose.model('Product', productSchema);
