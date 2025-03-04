// import axios from 'axios'
// import React, { useState,} from 'react'
// import { FaEye, FaEyeSlash } from 'react-icons/fa'
// import { toast, ToastContainer } from 'react-toastify'
// import { useNavigate } from "react-router-dom";
// import Pokemon1 from '../Updated Image/assets/pokemons/shiny/69.png'
// import Pokemon2 from '../Updated Image/assets/pokemons/shiny/680.png'
// import Pokemon3 from '../Updated Image/assets/pokemons/shiny/10055.png'
// import Pokemon4 from '../Updated Image/assets/pokemons/shiny/10111.png'
// import Pokemon5 from '../Updated Image/assets/pokemons/shiny/10099.png'
// import Pokemon6 from '../Updated Image/assets/pokemons/shiny/666-marine.png'
// import Pokemon7 from '../Updated Image/assets/pokemons/shiny/648.png'
// import Pokemon8 from '../Updated Image/assets/pokemons/shiny/619.png'
// import Pokemon9 from '../Updated Image/assets/pokemons/shiny/68.png'
// const Login = () => {
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate=useNavigate()
//     const baseUrl=process.env.REACT_APP_BACKEND_URL
//     const handleSubmit=async()=>{
//         try {
//             const response=await axios.post(`${baseUrl}/user/login`,{
//                 email,
//                 password
//             },
//             { headers: { "Content-Type": "application/json" } }
            
//         )
//           console.log(response.data)
//          if (response.status === 200) {
//                     toast.success("User looged in!");
//                     sessionStorage.setItem("userId",response.data._id)
//                     sessionStorage.setItem("token",response.data.token)
//                     navigate("/");
//                 }
//         } catch (error) {
//             console.log("error while logging",error)
//             toast.error("failed to log in")
//         }
//     }
//   return (
//     <div>
//        <div className="signup-container">
//       <div className="signup-box">
//         <h2 className="signup-title">POKEDEX LOGIN</h2>

//         <div className="input-group">
//           <input
//             type="email"
//             placeholder="EMAIL"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>


//         <div className="input-group">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="PASSWORD"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <button className="signup-button" onClick={handleSubmit}>
//           LOGIN
//         </button>

//         <div className="pokemon-graphics">
//           <img src={Pokemon1} alt="Pikachu" className="pokemon-img" />
//           <img src={Pokemon2} alt="Bulbasaur" className="pokemon-img" />
//           <img src={Pokemon3} alt="Charizard" className="pokemon-img" />
//           <img src={Pokemon4} alt="Charizard" className="pokemon-img" />
//           <img src={Pokemon5} alt="Charizard" className="pokemon-img" />
//         </div>

//         <div className="stats-section">
//           <img className="stat-icon" alt="Stat" src={Pokemon6} />
//           <img className="stat-icon" alt="Stat" src={Pokemon7} />
//           <img className="stat-icon" alt="Stat" src={Pokemon8} />
//           <img className="stat-icon" alt="Stat" src={Pokemon9} />
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//     </div>
//   )
// }

// export default Login


import axios from 'axios'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import Pokemon1 from '../Updated Image/assets/pokemons/shiny/69.png'
import Pokemon2 from '../Updated Image/assets/pokemons/shiny/680.png'
import Pokemon3 from '../Updated Image/assets/pokemons/shiny/10055.png'
import Pokemon4 from '../Updated Image/assets/pokemons/shiny/10111.png'
import Pokemon5 from '../Updated Image/assets/pokemons/shiny/10099.png'
import Pokemon6 from '../Updated Image/assets/pokemons/shiny/666-marine.png'
import Pokemon7 from '../Updated Image/assets/pokemons/shiny/648.png'
import Pokemon8 from '../Updated Image/assets/pokemons/shiny/619.png'
import Pokemon9 from '../Updated Image/assets/pokemons/shiny/68.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const baseUrl = process.env.REACT_APP_BACKEND_URL

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, {
        email,
        password
      },
        { headers: { "Content-Type": "application/json" } }
      )
      console.log(response.data)
      if (response.status === 200) {
        toast.success("User logged in!");
        sessionStorage.setItem("userId", response.data._id)
        sessionStorage.setItem("token", response.data.token)
        navigate("/");
      }
    } catch (error) {
      console.log("error while logging", error)
      toast.error("Failed to log in")
    }
  }

  return (
    <div>
      <div className="signup-container">
        <div className="signup-box">
          <h2 className="signup-title">POKEDEX LOGIN</h2>

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
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="signup-button" onClick={handleSubmit}>LOGIN</button>

          <p className="signup-text" style={{ backgroundColor: 'black' }}>Create an account</p>
          <p className="signup-link" style={{ backgroundColor: 'black' }} onClick={() => navigate('/signup')}>SIGNUP</p>

          <div className="pokemon-graphics">
            <img src={Pokemon1} alt="Pikachu" className="pokemon-img" />
            <img src={Pokemon2} alt="Bulbasaur" className="pokemon-img" />
            <img src={Pokemon3} alt="Charizard" className="pokemon-img" />
            <img src={Pokemon4} alt="Charizard" className="pokemon-img" />
            <img src={Pokemon5} alt="Charizard" className="pokemon-img" />
          </div>

          <div className="stats-section">
            <img className="stat-icon" alt="Stat" src={Pokemon6} />
            <img className="stat-icon" alt="Stat" src={Pokemon7} />
            <img className="stat-icon" alt="Stat" src={Pokemon8} />
            <img className="stat-icon" alt="Stat" src={Pokemon9} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
