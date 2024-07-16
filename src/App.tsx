import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home"
import { PredictNBA, PredictNFL, PredictEPL } from "./pages/Predict"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nba" element={<PredictNBA />} />
          <Route path="/nfl" element={<PredictNFL />} />
          <Route path="/premierleague" element={<PredictEPL />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
