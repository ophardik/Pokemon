import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Designing/ComparePokemon.css";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import loadingGif from "../Updated Image/assets/types/pokeball-loader.gif";

const ComparePokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  const userId = sessionStorage.getItem("userId");

  const getComparedPokemon = async () => {
    try {
      if (!userId) {
        toast.error("Please Login to view");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "/api/getComparePokemon",
        { userId },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Fetched Pokémon comparisons:", response.data.pokemonList);
      setPokemon(response.data.pokemonList || []);
    } catch (error) {
      console.error("Error fetching Pokémon comparisons:", error);
      toast.error("Failed to fetch Pokémon comparison data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePokemon = async (pokemon1, pokemon2) => {
    try {
      const response = await axios.delete(
        `/api/deleteComparePokemon?userId=${userId}&pokemon1=${pokemon1}&pokemon2=${pokemon2}`
      );

      if (response.data.success) {
        toast.success("Pokémon deleted successfully");
        setPokemon((prev) => prev.filter((p) => !(p.pokemon1.name === pokemon1 && p.pokemon2.name === pokemon2)));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting Pokémon:", error);
      toast.error("Failed to delete Pokémon");
    }
  };

  useEffect(() => {
    getComparedPokemon();
  }, [userId]);

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

  return (
    <div className="compare-container">
      <ToastContainer />
      <h2 className="compare-title">Compared Pokémon</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img src={loadingGif} alt="Loading..." className="img-fluid" style={{ width: "100px", height: "100px" }} />
        </div>
      ) : pokemon.length === 0 ? (
        <p className="empty-text">No Pokémon comparisons found.</p>
      ) : (
        <ul className="pokemon-list">
          {pokemon.map((p, index) => (
            <li key={index} className="pokemon-card2">
              {/* Pokémon 1 */}
              <Link to={`/pokemon/${p.pokemon1.name}`}>
                <img src={p.pokemon1.image} alt={p.pokemon1.name} className="pokemon-image" />
              </Link>
              <div className="pokemon-name2">{p.pokemon1.name.toUpperCase()}</div>

              <span className="vs-text">VS</span>

              {/* Pokémon 2 */}
              <Link to={`/pokemon/${p.pokemon2.name}`}>
                <img src={p.pokemon2.image} alt={p.pokemon2.name} className="pokemon-image" />
              </Link>
              <div className="pokemon-name2">{p.pokemon2.name.toUpperCase()}</div>

              <p className="winner-text">🏆 Winner: <strong>{p.winner}</strong></p>

              {/* Delete Icon */}
              <button className="delete-btn" onClick={() => handleDeletePokemon(p.pokemon1.name, p.pokemon2.name)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComparePokemon;
