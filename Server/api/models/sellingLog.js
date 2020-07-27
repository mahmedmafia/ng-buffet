const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellingLogsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantitySoldToUser: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  dateSold: { type: Date },
  TotalPrice: { type: Number },
});
module.exports = mongoose.model('sellingLogsSchema', sellingLogsSchema);
