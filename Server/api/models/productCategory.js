const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
});
module.exports = mongoose.model('productCategory', productCategorySchema);
