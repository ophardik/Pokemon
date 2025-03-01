import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import loadingGif from "../Updated Image/assets/types/pokeball-loader.gif";
import { images, defaultImages, typeIcons } from "../../utils/Images";
import '../Designing/SpecificPokemon.css';

const SpecificPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const { name } = useParams();
  const baseUrl=process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    fetchSpecificPokemon(name);
  }, [name]);

  const fetchSpecificPokemon = async (pokemonName) => {
    try {
      const response = await axios.get(`${baseUrl}/api/specificPokemon?name=${pokemonName}`);
      setPokemon(response.data);

      if (response.data.evolves_to && response.data.evolves_to.length > 0) {
        setEvolution(response.data.evolves_to[0]);
      }
    } catch (error) {
      console.log("Error fetching specific Pokémon:", error);
      toast.error("Error fetching Pokémon details");
    }
  };

  const getLocalImage = (pokemonId) => {
    return images[pokemonId] || pokemon.sprites?.front_default || defaultImages["default"];
  };

  if (!pokemon) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={loadingGif} alt="Loading..." className="img-fluid" style={{ width: "100px", height: "100px" }} />
      </div>
    );
  }

  return (
    <div className="specific-pokemon-container">
      {/* 🔹 Name & Type at Top-Left */}
      <div className="pokemon-info">
        <h1 className="pokemon-name">{pokemon.name.toUpperCase()}</h1>
        <div className="pokemon-types">
          {pokemon.types.map((typeInfo) => {
            const typeName = typeInfo.type.name;
            return (
              <span key={typeName} className="pokemon">
                {typeIcons[typeName] ? (
                  <img
                    src={typeIcons[typeName]}
                    alt={typeName}
                    className="img"
                    style={{ width: "60px", height: "60px", marginRight: "5px", padding: "8px" }}
                  />
                ) : (
                  typeName.toUpperCase()
                )}
              </span>
            );
          })}
        </div>

        <Link to={`/nextEvolution/${pokemon.name}`}>
          <button className="next-evolution-button">
            See Next Evolution
          </button>
        </Link>
      </div>

      {/* 🌟 Centered Highlighted Pokémon Image */}
      <img src={getLocalImage(pokemon.id)} alt={pokemon.name} className="pokemon-image2" />

      {/* 📊 Stats in Bottom-Left */}
      <div className="stats-container">
        <h3 className="strength-weakness-title">STATS</h3>
        {pokemon.stats.map((stat, index) => (
          <div key={index} className="stat-item">
            {stat.stat.name.toUpperCase()}: {stat.base_stat}
          </div>
        ))}
      </div>

      {/* 🛡️ Moves Section in Bottom-Right */}
      <div className="moves-container">
        <h3 className="moves-title">Moves</h3>
        <div className="moves-list">
          {pokemon.moves && pokemon.moves.length > 0 ? (
            pokemon.moves.slice(0, 6).map((move, index) => (
              <div key={index} className="move-item">
                {move.move.name.toUpperCase()}
              </div>
            ))
          ) : (
            <p>No moves available</p>
          )}
        </div>
      </div>

      {/* 🛠️ Evolution Section in Bottom-Right */}
      {evolution && (
        <div className="evolution-container">
          <h3>Next Evolution</h3>
          <img src={getLocalImage(evolution.id)} alt={evolution.name} className="evolution-image" />
        </div>
      )}
    </div>
  );
};

export default SpecificPokemon;