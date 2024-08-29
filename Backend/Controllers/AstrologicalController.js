// const astroModel=require("../Models/AstrologicalModel")
// const userModel=require("../Models/userModel")

// const addAstrologer=async(req,res)=>{
//     try {
//         const {name}=req.body;
//         console.log("Req.body",req.body);
//         await astroModel.create({
//             name:name
//         })
//         res.json({
//             success:"true",
//             message: 'Astrologer added successfully', 
//         });
//     } catch (error) {
//         console.log("Error in adding astrologer",error);
//     }
// }

// const toggleAstrologer=async(req,res)=>{
//     try {
//         const astrologerId=req.params.id;
//         const astrologer=await astroModel.findById(astrologerId);
//         if(!astrologer){
//             return res.status(404).json({
//                 success:"false",
//                 message: 'Astrologer not found',
//             })
//         }
//         astrologer.isTop=!astrologer.isTop;
//         await astrologer.save();
//         res.json({ message: `Astrologer ${astrologerId} toggled successfully`, astrologer });
//     } catch (error) {
//         console.log("Error in toggling astrologer",error);
//     }
// }
// const distributeUser = async () => {
//     try {
//       // Fetch all astrologers, sorting by least connections first and prioritizing top astrologers
//       const astrologers = await astroModel.find()
//         .sort({ connections: 1, isTop: -1 }) // Least connections first, top astrologers prioritized
//         .exec();
  
//       if (astrologers.length === 0) {
//         throw new Error('No astrologers available');
//       }
  
//       // Filter astrologers based on capacity
//       const availableAstrologers = astrologers.filter(a => {
//         return a.connections < (a.isTop ? a.maxConnections : Infinity);
//       });
  
//       if (availableAstrologers.length === 0) {
//         throw new Error('No available astrologer with capacity');
//       }
  
//       // Distribute user to the least connected astrologer from the filtered list
//       const astrologer = availableAstrologers[0]; // Pick the astrologer with the least connections
  
//       const user = new userModel({ assignedAstrologer: astrologer._id });
//       await user.save();
      
//       astrologer.connections += 1; // Increment connection count for the astrologer
//       await astrologer.save();
  
//       return { message: 'User added and distributed successfully', user };
//     } catch (error) {
//       throw new Error(`Error distributing user: ${error.message}`);
//     }
//   };

// module.exports={
//     addAstrologer,
//     toggleAstrologer,
//     distributeUser
// }

const astroModel = require('../Models/AstrologicalModel');
const userModel = require('../Models/userModel');

const addAstrologer = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("Req.body", req.body);
    await astroModel.create({ name });
    res.json({
      success: true,
      message: 'Astrologer added successfully',
    });
  } catch (error) {
    console.log("Error in adding astrologer", error);
    res.status(500).json({
      success: false,
      message: 'Error adding astrologer',
      error: error.message
    });
  }
};

const toggleAstrologer = async (req, res) => {
  try {
    const astrologerId = req.params.id;
    const astrologer = await astroModel.findById(astrologerId);
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer not found',
      });
    }
    astrologer.isTop = !astrologer.isTop;
    await astrologer.save();
    res.json({
      success: true,
      message: `Astrologer ${astrologerId} toggled successfully`,
      astrologer,
    });
  } catch (error) {
    console.log("Error in toggling astrologer", error);
    res.status(500).json({
      success: false,
      message: 'Error toggling astrologer',
      error: error.message
    });
  }
};

const distributeUser = async (req, res) => {
  try {
    // Fetch all astrologers, sorting by least connections first and prioritizing top astrologers
    const astrologers = await astroModel.find()
      .sort({ connections: 1, isTop: -1 }) // Least connections first, top astrologers prioritized
      .exec();

    if (astrologers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No astrologers available',
      });
    }

    // Filter astrologers based on capacity
    const availableAstrologers = astrologers.filter(a => {
      return a.connections < (a.isTop ? a.maxConnections : Infinity);
    });

    if (availableAstrologers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No available astrologer with capacity',
      });
    }

    // Distribute user to the least connected astrologer from the filtered list
    const astrologer = availableAstrologers[0]; // Pick the astrologer with the least connections

    const user = new userModel({ assignedAstrologer: astrologer._id });
    await user.save();
    
    astrologer.connections += 1; // Increment connection count for the astrologer
    await astrologer.save();

    res.json({
      success: true,
      message: 'User added and distributed successfully',
      user,
    });
  } catch (error) {
    console.error('Error distributing user:', error);
    res.status(500).json({
      success: false,
      message: 'Error distributing user',
      error: error.message
    });
  }
};

module.exports = {
  addAstrologer,
  toggleAstrologer,
  distributeUser
};
