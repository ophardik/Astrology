const mongoose=require("mongoose");
const astroSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    connections:{
        type:Number,
        default:0,
    },
    isTop:{
        type:Boolean,
        default:false,
    },
    maxConnections: { type: Number, default: 100 }
})


const astroModel=new mongoose.model("Astro",astroSchema);
module.exports=astroModel;