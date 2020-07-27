const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventoryLogSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
  product:{type:Schema.Types.ObjectId,ref:"Product"},
  price: { type: Number },
  product_quantity_in_inventory: { type: Number },
  quantiy_added:{type:Number},
  new_quantity:{type:Number},
  InventoryDate: { type: Date },
});

module.exports = mongoose.model('Inventory', InventoryLogSchema);
