const express=require("express");
const connectToDb = require("./config/db");
const cors=require("cors")
const getPokemon=require("./Routes/getPokemon")
const userRoute=require("./Routes/userRoute")
require("dotenv").config();
const app=express();
const PORT=process.env.PORT;
 
app.use(express.json({ limit: "10mb" })); // Increase limit
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cors())
connectToDb()
app.use("/api",getPokemon)
app.use("/user",userRoute)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})