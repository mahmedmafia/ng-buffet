const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  role:{type:String},
  rank:{type:String},
  password: { type: String, required: true },
  ta2ree4aPages: [{ type: Schema.Types.ObjectId, ref: 'Ta2ree4aPage' }],
});
module.exports = mongoose.model('User', userSchema);
