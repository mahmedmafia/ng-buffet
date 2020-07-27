const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  OrderDate: { type: Date ,default:Date.now},
  TotalPrice: { type: Number ,default:0},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Order', OrderSchema);
