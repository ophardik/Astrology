const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    assignedAstrologer: { type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer' },

})


const userModel=new mongoose.model("User",userSchema)
module.exports=userModel;