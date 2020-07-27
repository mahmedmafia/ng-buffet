const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantitySold: { type: Number },
  productPrice:{type:Number},
  TotalPrice: { type: Number },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
});
module.exports = mongoose.model('OrderItem', OrderItemSchema);
