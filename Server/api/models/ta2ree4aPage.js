const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Ta2ree4aPageSchema=new Schema({
    _id:Schema.Types.ObjectId,
    orders:[{type:Schema.Types.ObjectId,ref:'Order'}],
    Ta2ree4aDate:{type:Date},
    user:{type:Schema.Types.ObjectId,ref:'User'},
});
module.exports = mongoose.model('Ta2ree4aPage', Ta2ree4aPageSchema);


