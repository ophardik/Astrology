const astroModel=require("../Models/AstrologicalModel")
const userModel=require("../Models/userModel")

const addUser=async(req,res)=>{
    try {
        const astrologers=await astroModel.find().sort({connection:1,isTop:-1});
        const astrologer = astrologers[0];

    if (!astrologer) {
        return res.status(404).json({ message: 'No astrologers available' });
      }
      const user = new userModel({ assignedAstrologer: astrologer._id });
      await user.save();
      astrologer.connections += 1; // Increment connection count for the astrologer
    await astrologer.save();
    res.json({ message: 'User added and distributed successfully', user });
  
    } catch (error) {
        console.log("error in adding user",error);
    }
}

module.exports=addUser;