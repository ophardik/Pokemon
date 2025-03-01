const mongoose=require("mongoose")
const comparePokemonSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    pokemon1: { type: Object, required: true }, // Change from String to Object
   pokemon2: { type: Object, required: true }, // Change from String to Object
})
const compareModel=mongoose.model("comparePokemon",comparePokemonSchema)
module.exports=compareModel