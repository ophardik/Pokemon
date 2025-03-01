const userModel=require("../Models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config
const signup=async(req,res)=>{
    try {
       const {name,email,password}=req.body;
       const exisitingUser=await userModel.findOne({email})
       if(exisitingUser){
        return res.status(400).json({message:"User already exists"})
       }
       const hashedPassword=await bcrypt.hash(password,10);
       const newUser=await userModel.create({
        name,
        email,
        password:hashedPassword
       })
       res.status(201).json({message:"User created successfully",newUser})
    } catch (error) {
        console.log("error in signing up",error)
        return res.status(404).json({
            success:"false",
            message:"Error in signing up"
        })
    }
}
const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        const token = jwt.sign({ email: user.email },  process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            msg: "Login successful",
            token,
            _id:user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.log("error in login api",error)
        return res.status(404).json({
            success:"false",
            message:"Error in signing up"
        })
    }
}

module.exports={signup,login}