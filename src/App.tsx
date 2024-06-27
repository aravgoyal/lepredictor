import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home"
import { Predict } from "./pages/Predict"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

function App() {

  return (
    <>
      <BrowserRouter>
        <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
