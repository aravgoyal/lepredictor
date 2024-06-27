import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Home } from "./pages/Home"
import { Predict } from "./pages/Predict"
import { AuthComponent } from "./auth/Login";



function App() {

  return (
    <>
      <BrowserRouter>
        <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/login" element={<AuthComponent />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
