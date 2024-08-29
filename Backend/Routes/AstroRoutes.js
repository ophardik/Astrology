const express=require("express");
const router=express.Router();
const {addAstrologer,toggleAstrologer,distributeUser}=require("../Controllers/AstrologicalController")
router.post("/addAstrologer",addAstrologer);
router.post("/toggleAstrologer/:id",toggleAstrologer);
router.post("/distributeUser",distributeUser);

module.exports=router;