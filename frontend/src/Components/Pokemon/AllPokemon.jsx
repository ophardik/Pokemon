import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper navigation styles
import { Navigation } from "swiper/modules"; // Import Navigation module
import { images, typeIcons } from "../../utils/Images";
import loadingGif from "../Updated Image/assets/types/pokeball-loader.gif";
import '../Designing/Pokemon.css'
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

const AllPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [comparison, setComparison] = useState(null);
  const userId = sessionStorage.getItem("userId")
  const navigate=useNavigate()

  useEffect(() => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((res) => res.json())
      .then((data) => {
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(promises).then((results) => {
          setPokemonList(results);
          setLoading(false);
        });
      });
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const chunkSize = Math.ceil(filteredPokemon.length / 8);
  const pokemonChunks = [];
  for (let i = 0; i < filteredPokemon.length; i += chunkSize) {
    pokemonChunks.push(filteredPokemon.slice(i, i + chunkSize));
  }

  const getPokemonImage = (pokemon) => {
    return images[pokemon.id] || pokemon.sprites?.front_default;
  };

  const savePokemon = async (pokemon) => {
    try {
      const userId = sessionStorage.getItem("userId");
      console.log(userId, "userId");

      if (!userId) {
        toast.error("Login to add!");
        setTimeout(()=>{
          navigate('/login')
        },2000)
        return;
      }

      const existingResponse = await axios.post("/api/checkPokemon", {
        userId,
        name: pokemon.name,
      });

      const exists = existingResponse.data?.exists;

      if (exists) {
        toast.info(`${pokemon.name} is already in your list!`);
        return;
      }

      const response = await axios.post("/api/savePokemon", {
        userId,
        pokeId: pokemon.id,
        name: pokemon.name,
        image: images[pokemon.id] || pokemon.sprites.front_default,
        types: pokemon.types.map((type) => type.type.name),
        abilities: pokemon.abilities.map((ability) => ability.ability.name),
        stats: pokemon.stats,
      });

      if (response.status === 200) {
        toast.success(`${pokemon.name} saved successfully!`);
      } else {
        throw new Error("Failed to save Pokémon");
      }
    } catch (error) {
      console.error("Error saving Pokémon:", error);
      toast.error("Failed to save Pokémon. Please try again.");
    }
  };

  const comparePokemon = async (pokemon) => {
    if (!userId) {
      toast.error("Login to compare!");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
  
    try {
      if (!selectedPokemon) {
        setSelectedPokemon(pokemon);
        toast.info(`${pokemon.name} selected for comparison`);
        return;
      }
  
      const response = await axios.post(`/api/comparePokemon`, {
        userId,
        pokemon1: selectedPokemon.name,
        pokemon2: pokemon.name,
      });
  
      setComparison(response.data);
      setSelectedPokemon(null);
    } catch (error) {
      console.error("Error in comparing Pokémon:", error);
      toast.error("Error in comparing Pokémon");
    }
  };
  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={loadingGif} alt="Loading..." className="img-fluid" style={{ width: "100px", height: "100px" }} />
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ backgroundColor: 'black' }}>
      <ToastContainer />
      {/* Responsive Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h1 className="text-center mb-3" style={{ color: 'white' }}>Pokémon List</h1>
        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          <Link to="/comparePokemon">
            <button className="btn btn-light mx-2 custom-button" style={{ color: 'black' }} onClick={comparePokemon}>Compare</button>
          </Link>
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ color: 'black', backgroundColor: '#ffeda7' }}
          />
          <Link to="/pokemon/myList">
            <button className="btn btn-light mx-2 custom-button" style={{ color: 'black' }}>My List</button>
          </Link>
        </div>
      </div>

      {pokemonChunks.map((chunk, index) => (
        <div key={index} className="mb-4">
          <Swiper
            slidesPerView={1} // Default for mobile
            spaceBetween={20}
            navigation={true} // Enable navigation arrows
            modules={[Navigation]} // Use the Navigation module
            breakpoints={{
              576: { slidesPerView: 2 }, // 2 slides for tablets
              768: { slidesPerView: 3 }, // 3 slides for small desktops
              992: { slidesPerView: 4 }, // 4 slides for larger screens
            }}
          >
            {chunk.map((pokemon) => (
              <SwiperSlide key={pokemon.id} className="p-3 border rounded" style={{ backgroundColor: 'black' }}>
                <Link to={`/pokemon/${pokemon.name}`} className="text-decoration-none text-dark">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={getPokemonImage(pokemon)}
                      alt={pokemon.name}
                      className="img-fluid"
                      style={{
                        width: "100%",
                        maxWidth: "150px",
                        height: "auto",
                        objectFit: "cover",
                        backgroundColor: "black",
                      }}
                      onError={(e) => (e.target.src = loadingGif)}
                    />
                    <button
                      className="compare-btn position-absolute top-0 start-0 m-2"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                      title="Compare Pokémon"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await comparePokemon(pokemon);
                      }}
                    >
                      <i className="fas fa-balance-scale"></i>
                    </button>

                    <button
                      className="save-btn position-absolute top-0 end-0 m-2"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "24px",
                      }}
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await savePokemon(pokemon);
                      }}
                      title="Add to My List"
                    >
                      <i className="fas fa-plus-circle"></i>
                    </button>
                  </div>
                  <h5 className="text-center mt-2" style={{ color: 'white' }}>{pokemon.name.toUpperCase()}</h5>
                </Link>
                <div className="d-flex justify-content-center mt-3">
                  {pokemon.types.map((typeInfo) => {
                    const typeName = typeInfo.type.name;
                    return (
                      <span key={typeName} className="badge primary-red mx-1">
                        {typeIcons[typeName] ? (
                          <img
                            src={typeIcons[typeName]}
                            alt={typeName}
                            className="img-fluid"
                            style={{ width: "40px", height: "40px" }}
                          />
                        ) : (
                          typeName.toUpperCase()
                        )}
                      </span>
                    );
                  })}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default AllPokemon;