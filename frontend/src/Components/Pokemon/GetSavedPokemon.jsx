import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import loadingGif from "../Updated Image/assets/types/pokeball-loader.gif";
import { toast, ToastContainer } from "react-toastify";
import "../Designing/SavedPokemon.css"; // Import CSS file

const GetSavedPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const getPokemon = async () => {
    if (!userId) {
      console.error("User ID is missing");
      toast.error("Login to view");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/getSavePokemon",
        { userId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setPokemon(response.data.data);
      } else {
        console.error("Error:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching saved Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const removePokemon = async (pokeName) => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      const response = await axios.delete(`/api/deletePokemon?userId=${userId}&pokemonName=${pokeName}`);

      if (response.data.success) {
        setPokemon(pokemon.filter((poke) => poke.name !== pokeName)); // Update state
        toast.success("Pokémon removed");
      } else {
        console.error("Error:", response.data.msg);
        toast.error("Error in removing Pokémon");
      }
    } catch (error) {
      console.error("Error removing Pokémon:", error);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  if (!userId) {
    return (
      <div className="login-container">
        <p className="login-message">Please log in to view your saved Pokémon</p>
        <button className="login-button" onClick={() => navigate("/login")}>
          LOGIN
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img
          src={loadingGif}
          alt="Loading..."
          className="img-fluid"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }

  return (
    <div className="pokemon-container">
      <ToastContainer />

      <h2 className="pokemon-title">Your Saved Pokémon</h2>
      <div className="pokemon-grid">
        {pokemon.length > 0 ? (
          pokemon.map((poke, index) => (
            <div key={index} className="pokemon-card">
              <h3 className="pokemon-name2">{poke.name.toUpperCase()}</h3>
              <Link to={`/pokemon/${poke.name}`}>
                <img src={poke.image} alt={poke.name} className="pokemon-image" />
              </Link>
              <FaTrash
                className="remove-icon"
                onClick={() => removePokemon(poke.name)}
                title="Remove Pokémon"
              />
            </div>
          ))
        ) : (
          <p className="no-pokemon">No saved Pokémon found.</p>
        )}
      </div>
    </div>
  );
};

export default GetSavedPokemon;
