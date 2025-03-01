import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Designing/Evolution.css"; // Ensure correct path
import loadingGif from "../Updated Image/assets/types/pokeball-loader.gif";

const NextEvolution = () => {
  const { pokemonName } = useParams();
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pokemonName) {
      fetchNextEvolutions(pokemonName);
    }
  }, [pokemonName]);

  const fetchNextEvolutions = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/getPokemonEvolution?pokemonName=${name}`, {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Expires": "0",
        },
        params: { timestamp: new Date().getTime() }, // Prevent caching
      });

      if (response.data.success && response.data.evolution_chain.length > 1) {
        const allEvolutions = response.data.evolution_chain;
        
        // Find the index of the current Pokémon
        const currentIndex = allEvolutions.findIndex((evo) => evo.name === name);

        // Get only the upcoming evolutions
        const nextEvolutions = allEvolutions.slice(currentIndex + 1);

        if (nextEvolutions.length > 0) {
          setEvolutions(nextEvolutions);
        } else {
          toast.error("No further evolutions available.");
        }
      } else {
        toast.error("No evolutions found.");
      }
    } catch (error) {
      console.error("Error fetching evolutions:", error);
      toast.error("Failed to load evolution data.");
    }
    setLoading(false);
  };

  return (
    <div className="evolution-wrapper">
  <div className="container text-center mt-4 evolution-container">
    <h3 className="mb-4 text-primary fw-bold">Next Evolutions</h3>
    {loading ? (
     <div className="d-flex justify-content-center align-items-center vh-100">
     <img src={loadingGif} alt="Loading..." className="img-fluid" style={{ width: "100px", height: "100px" }} />
   </div>
    ) : evolutions.length > 0 ? (
      <div className="row justify-content-center">
        {evolutions.map((evo) => (
          <div key={evo.name} className="col-md-3 col-sm-6 mb-4">
            <div className="card evolution-card shadow-sm p-3">
              <Link to={`/pokemon/${evo.name}`}>
              <img src={evo.image} alt={evo.name} className="img-fluid evolution-image mx-auto" />
              </Link>
              <p className="evolution-name mt-3 fw-bold">{evo.name}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-danger">No further evolutions available.</p>
    )}
  </div>
</div>
  );
};

export default NextEvolution;
