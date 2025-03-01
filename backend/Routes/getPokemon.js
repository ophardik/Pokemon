const express=require("express");
const { fetchAllPokemon, specificPokemon, savePokemon, getSavedPokemon, comparePokemon, getComparedPokemon, getPokemonEvolution, deletePokemon, deleteComparePokemon, checkPokemon } = require("../Controllers/fetchPokemon");
const router=express.Router();



router.get("/getPokemon",fetchAllPokemon)
router.get("/specificPokemon",specificPokemon)
router.post("/savePokemon",savePokemon )
router.post("/getSavePokemon",getSavedPokemon )
router.post("/getSavePokemon",getSavedPokemon )
router.post("/comparePokemon",comparePokemon )
router.post("/getComparePokemon",getComparedPokemon )
router.get("/getPokemonEvolution",getPokemonEvolution )
router.delete("/deletePokemon",deletePokemon )
router.delete("/deleteComparePokemon",deleteComparePokemon )
router.post("/checkPokemon",checkPokemon )




module.exports=router;