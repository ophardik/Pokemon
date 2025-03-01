import Login from './Components/Authentication/Login';
import Signup from './Components/Authentication/Signup';
import AllPokemon from './Components/Pokemon/AllPokemon';
import ComparePokemon from './Components/Pokemon/ComparePokemon';
import GetSavedPokemon from './Components/Pokemon/GetSavedPokemon';
import NextEvolution from './Components/Pokemon/NextEvolution';
import SpecificPokemon from './Components/Pokemon/SpecificPokemon';
import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<AllPokemon/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/pokemon/:name" element={<SpecificPokemon/>}/>
    <Route path="/pokemon/myList" element={<GetSavedPokemon/>}/>
    <Route path="/comparePokemon" element={<ComparePokemon/>}/>
    {/* <Route path="/nextEvolution/:name" element={<NextEvolution/>}/> */}
    <Route path="/nextEvolution/:pokemonName" element={<NextEvolution />} />

   </Routes>
   </BrowserRouter>
  );
}

export default App;
