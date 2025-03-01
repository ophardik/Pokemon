const axios = require("axios")
const pokeModel = require("../Models/pokeModel")
const userModel = require("../Models/userModel")
const compareModel = require("../Models/comparePokemon")
const fetchAllPokemon = async (req, res) => {
   try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
      return res.json(response.data)
   } catch (error) {
      console.log("error in fetching pokemon", error)
   }
}

const specificPokemon = async (req, res) => {
   try {
      const { name } = req.query;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      // console.log(response.data)
      return res.json(response.data);
   } catch (error) {
      console.log("error in specific pokemon api", error);
      return res.status(400).json({
         success: "false",
         message: "cannot get particular pokemon details"
      })
   }
}


const savePokemon = async (req, res) => {
   try {
      const { name, image, types, abilities, stats, pokeId, userId } = req.body;

      if (!name || !image || !types || !abilities || !stats || !userId) {
         return res.status(400).json({
            success: "false",
            message: "Please fill all the fields"
         });
      }

      const existingPokemon = await pokeModel.findOne({ name: name, userId: userId });
      if (existingPokemon) {
         return res.status(400).json({
            success: "false",
            message: "Pokemon already exists"
         });
      }

      const newPokemon = new pokeModel({
         name: name,
         pokeId: pokeId,
         image: image,
         types: types,
         abilities: abilities,
         stats: stats,
         userId: userId
      });

      await newPokemon.save();
      return res.json({
         success: "true",
         message: "Pokemon saved successfully"
      });
   } catch (error) {
      console.log("Error in savePokemon API", error);
      return res.status(400).json({
         success: "false",
         message: "Cannot save Pokemon details"
      });
   }
};


const getSavedPokemon = async (req, res) => {
   const { userId } = req.body;  // ✅ Get userId from body

   if (!userId) {
      return res.status(400).json({
         success: false,
         msg: "UserId is required.",
      });
   }

   try {
      const userExists = await userModel.findById(userId);
      if (!userExists) {
         return res.status(404).json({
            success: false,
            msg: "User not found",
         });
      }

      const pokemonList = await pokeModel.find({ userId });
      if (!pokemonList.length) {
         return res.status(404).json({
            success: false,
            msg: "No Pokémon found for this user.",
         });
      }

      return res.json({
         success: true,
         message: "Pokemon list fetched successfully",
         data: pokemonList, // Ensure the frontend accesses `response.data.data`
      });
   } catch (error) {
      console.error("Error in getSavedPokemon API", error);
      return res.status(500).json({
         success: false,
         message: "Server error while fetching Pokémon",
      });
   }
};

const comparePokemon = async (req, res) => {
   try {
      const { userId, pokemon1, pokemon2 } = req.body;

      if (!userId || !pokemon1 || !pokemon2) {
         return res.status(400).json({
            success: false,
            message: "User ID and Pokémon names are required.",
         });
      }

      const userExists = await userModel.findById(userId);
      if (!userExists) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      // Fetch Pokémon details with error handling
      const fetchPokemon = async (pokemon) => {
         try {
            const response = await axios.get(
               `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
            );
            return response.data;
         } catch (error) {
            throw new Error(`Pokémon '${pokemon}' not found.`);
         }
      };

      const [poke1, poke2] = await Promise.all([
         fetchPokemon(pokemon1),
         fetchPokemon(pokemon2),
      ]);

      const formatPokemon = (pokemon) => ({
         name: pokemon.name,
         id: pokemon.id,
         image: pokemon.sprites.front_default,
         stats: pokemon.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
         })),
      });

      const data1 = formatPokemon(poke1);
      const data2 = formatPokemon(poke2);

      await compareModel.create({
         userId,
         pokemon1: data1,
         pokemon2: data2,
      });

      return res.json({
         success: true,
         message: "Pokémon comparison successful",
         pokemon1: data1,
         pokemon2: data2,
      });
   } catch (error) {
      console.error("Error in comparePokemon:", error.message);
      return res.status(400).json({
         success: false,
         message: error.message || "Error in comparePokemon API",
      });
   }
};


const getComparedPokemon = async (req, res) => {
   try {
      const { userId } = req.body;
      if (!userId) {
         return res.status(400).json({
            success: false,
            message: "User ID is required",
         })
      }
      const comparisons = await compareModel.find({ userId })
      if (comparisons.length === 0) {
         return res.json({
            success: true,
            message: "No Pokémon comparisons found for this user.",
            pokemonList: [],
         });
      }
      return res.json({
         success: true,
         pokemonList: comparisons,
      });
   } catch (error) {
      console.log("error in getComparedPokemon api", error)
      return res.status(400).json({
         success: false,
         message: "Error in getComparedPokemon API",
      })
   }
}

const getPokemonEvolution = async (req, res) => {
   try {
     const { pokemonName } = req.query;
     const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
     const evolutionUrl = speciesRes.data.evolution_chain.url;
     const evolutionRes = await axios.get(evolutionUrl);
     
     const evolutions = [];
     let current = evolutionRes.data.chain;
 
     while (current) {
       const name = current.species.name;
       const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
       const image = pokemonRes.data.sprites.other["official-artwork"].front_default;
 
       evolutions.push({ name, image });
 
       if (current.evolves_to.length > 0) {
         current = current.evolves_to[0]; // Move to next evolution
       } else {
         current = null;
       }
     }
 
     res.json({ success: true, pokemon: pokemonName, evolution_chain: evolutions });
   } catch (error) {
     console.log("Error while getting evolution", error);
     res.status(400).json({ success: false, message: "Error in evolution API" });
   }
 };

const deletePokemon=async(req,res)=>{
   try {
     const {userId,pokemonName}=req.query;
     console.log(userId,"userId")
     if(!userId ){
      return res.status(400).json({success:false,message:"UserId not found"});
     }
     if(!pokemonName ){
      return res.status(400).json({success:false,message:"Pokemon not selected"});
     }

     const deletePokemon = await pokeModel.findOneAndDelete({ name: pokemonName, userId });
     if(!deletePokemon){
      return res.status(400).json({success:false,message:"Pokemon Not Found"})
     }
     res.json({success:true,message:"Pokemon Deleted Successfully"})
   } catch (error) {
      console.log("error in deleting pokemon",error);
      return res.status(400).json({
         success: false,
         message: "Error in deleting pokemon",
      })
   }
}

const deleteComparePokemon = async (req, res) => {
   try {
     const { userId, pokemon1, pokemon2 } = req.query;
 
     if (!userId) {
       return res.status(400).json({ success: false, message: "User ID not found" });
     }
     if (!pokemon1 || !pokemon2) {
       return res.status(400).json({ success: false, message: "Both Pokémon names are required" });
     }
 
     const deletedPokemon = await compareModel.findOneAndDelete({
       userId,
       $or: [
         { "pokemon1.name": pokemon1, "pokemon2.name": pokemon2 },
         { "pokemon1.name": pokemon2, "pokemon2.name": pokemon1 } // Handle reverse match
       ]
     });
 
     if (!deletedPokemon) {
       return res.status(404).json({ success: false, message: "Pokemon comparison not found" });
     }
 
     res.json({ success: true, message: "Pokemon comparison deleted successfully" });
   } catch (error) {
     console.error("Error in deleting Pokémon comparison:", error);
     return res.status(500).json({
       success: false,
       message: "Error in deleting Pokémon comparison",
     });
   }
 };

 const checkPokemon=async(req,res)=>{
   try {
      const {userId,name}=req.body;
      console.log("userId",userId)
      const existingPokemon=await pokeModel.findOne({userId,name})
      if (existingPokemon) {
         return res.json({ exists: true });
       }
   
       return res.json({ exists: false });
   } catch (error) {
      console.log("error in checking pokemon",error);
      return res.status(400).json({
         success: false,
         message:"cannot verify pokemon"
      })
   }
 }
 
module.exports = { fetchAllPokemon, specificPokemon, savePokemon, getSavedPokemon, comparePokemon, getComparedPokemon, getPokemonEvolution, deletePokemon,deleteComparePokemon,checkPokemon }