import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Predict } from "./pages/Predict"
import { Login } from "./pages/Login"


function App() {

  return (
    <>
      <BrowserRouter>
        <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
