 import React, { useState } from "react";
import x71 from "../Updated Image/assets/pokemons/shiny/10.png";
import x681 from "../Updated Image/assets/pokemons/shiny/100.png";
import x2121 from "../Updated Image/assets/pokemons/shiny/10001.png";
import x4566 from "../Updated Image/assets/pokemons/shiny/10087.png";
import bulbasaur from "../Updated Image/assets/pokemons/shiny/balbasaur.png";
import charizard from "../Updated Image/assets/pokemons/shiny/charlizard.png";
import Image4 from "../Updated Image/assets/pokemons/shiny/10007.png";
import Image5 from "../Updated Image/assets/pokemons/shiny/10025.png";
import pikachu from "../Updated Image/assets/pokemons/shiny/pikachu.png";
import "../Designing/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PokedexSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate();
  const baseUrl=process.env.REACT_APP_BACKEND_URL

  const handleSubmit = async () => {
    if (!email || !name || !password) {
        toast.error("All fields are required!");
        return;
    }

    try {
        const response = await axios.post(
            `${baseUrl}/user/signup`,  // ✅ Ensure correct API URL
            { name, email, password },
            { headers: { "Content-Type": "application/json" } }  // ✅ Ensure JSON format
        );

        if (response.status === 201) {
            toast.success("User created successfully!");
            navigate("/");
        }
    } catch (error) {
        console.error("Error in signing up:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Cannot signup. Please try again.");
    }
};


  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">POKEDEX SIGNUP</h2>

        <div className="input-group">
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="USERNAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="signup-button" onClick={handleSubmit}>
          SIGNUP
        </button>

        <div className="pokemon-graphics">
          <img src={pikachu} alt="Pikachu" className="pokemon-img" />
          <img src={bulbasaur} alt="Bulbasaur" className="pokemon-img" />
          <img src={charizard} alt="Charizard" className="pokemon-img" />
          <img src={Image4} alt="Charizard" className="pokemon-img" />
          <img src={Image5} alt="Charizard" className="pokemon-img" />
        </div>

        <div className="stats-section">
          <img className="stat-icon" alt="Stat" src={x2121} />
          <img className="stat-icon" alt="Stat" src={x681} />
          <img className="stat-icon" alt="Stat" src={x71} />
          <img className="stat-icon" alt="Stat" src={x4566} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PokedexSignup;
