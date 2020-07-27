const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceCategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
});
module.exports = mongoose.model('priceCategory', priceCategorySchema);
