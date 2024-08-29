const express=require("express");
const connectToMongoDb=require("./Connection/Connection")
const astroRoute=require("./Routes/AstroRoutes")
const userRoute=require("./Routes/userRoute")
const app=express();
const PORT=8002;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDb("mongodb+srv://hardikkhandelwal2514:hardik2514@cluster0.b0iyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to Database")
}).catch((error)=>{
    console.log("Error in connecting to Database",error)
})
app.use("/api",astroRoute);
app.use("/api2",userRoute)
app.listen(PORT,()=>{
    console.log("Server started");
})