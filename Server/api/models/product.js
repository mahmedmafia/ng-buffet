const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
  price: { type: Number },
  productCategory: [{ type: Schema.Types.ObjectId, ref: 'productCategory' }],
  priceCategory: { type: Schema.Types.ObjectId, ref: 'priceCategory' },
  quantity_in_inventory: { type: Number },
  Image: { type: String },
});

module.exports = mongoose.model('Product', ProductSchema);
