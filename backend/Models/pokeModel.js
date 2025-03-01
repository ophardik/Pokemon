const mongoose=require("mongoose");
const pokeSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
      pokeId: {
        type: Number,
        required: true,
        unique: true
      },
      image: {
        type: String,
        default: ''
      },
      types: {
        type: [String],
        default: []
      },
      abilities: {
        type: [String],
        default: []
      },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      // Base stats for the Pokémon
      stats: {
        hp: {
          type: Number,
          default: 0
        },
        attack: {
          type: Number,
          default: 0
        },
        defense: {
          type: Number,
          default: 0
        },
        specialAttack: {
          type: Number,
          default: 0
        },
        specialDefense: {
          type: Number,
          default: 0
        },
        speed: {
          type: Number,
          default: 0
        }
      },
    },
    {
      timestamps: true // Automatically adds createdAt and updatedAt fields
    }
)
const pokeModel=mongoose.model("Poke",pokeSchema)
module.exports=pokeModel