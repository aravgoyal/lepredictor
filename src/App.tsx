import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home"
import { PredictNBA, PredictNFL } from "./pages/Predict"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import ResetPassword from './auth/ResetPassword';

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nba" element={<PredictNBA />} />
          <Route path="/nfl" element={<PredictNFL />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />}/>
          <Route path ="/ResetPassword" element={<ResetPassword />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
